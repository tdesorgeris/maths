(function () {
  var data = window.AUTOMATISMES_LYCEE_DATA;
  var form = document.getElementById('automatismes-quiz-form');
  var themeOptions = document.getElementById('automatismes-theme-options');
  var output = document.getElementById('automatismes-quiz-output');
  var feedback = document.getElementById('automatismes-feedback');
  var message = document.getElementById('automatismes-message');
  var validateButton = document.getElementById('automatismes-validate');
  var nextButton = document.getElementById('automatismes-next');
  var resetButton = document.getElementById('automatismes-reset');
  var state = {
    questions: [],
    currentIndex: 0,
    selectedChoice: null,
    validated: false,
    score: 0,
    themeName: ''
  };

  if (!data || !Array.isArray(data.themes) || !form || !themeOptions || !output || !feedback || !message || !validateButton || !nextButton || !resetButton) {
    return;
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function shuffle(items) {
    var array = items.slice();
    for (var i = array.length - 1; i > 0; i -= 1) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function renderThemeOptions() {
    var options = [
      '<label class="generator-difficulty-option">' +
        '<input type="radio" name="automatismes-theme" value="all" checked>' +
        '<span>Mélange de tous les thèmes</span>' +
      '</label>'
    ];

    data.themes.forEach(function (theme) {
      options.push(
        '<label class="generator-difficulty-option">' +
          '<input type="radio" name="automatismes-theme" value="' + escapeHtml(theme.id) + '">' +
          '<span>' + escapeHtml(theme.name) + '</span>' +
        '</label>'
      );
    });

    themeOptions.innerHTML = options.join('');
  }

  function getSelectedThemeId() {
    var input = form.querySelector('input[name="automatismes-theme"]:checked');
    return input ? input.value : 'all';
  }

  function getQuestionPool(themeId) {
    if (themeId === 'all') {
      return data.themes.reduce(function (acc, theme) {
        return acc.concat(theme.questions.map(function (question) {
          return {
            theme: theme.name,
            question: question.question,
            choices: question.choices,
            answer: question.answer,
            explanation: question.explanation
          };
        }));
      }, []);
    }

    return data.themes
      .filter(function (theme) { return theme.id === themeId; })
      .reduce(function (acc, theme) {
        return acc.concat(theme.questions.map(function (question) {
          return {
            theme: theme.name,
            question: question.question,
            choices: question.choices,
            answer: question.answer,
            explanation: question.explanation
          };
        }));
      }, []);
  }

  function resetQuizDisplay() {
    state.questions = [];
    state.currentIndex = 0;
    state.selectedChoice = null;
    state.validated = false;
    state.score = 0;
    state.themeName = '';
    output.innerHTML = '<p class="generator-placeholder">Aucune question affichée pour le moment.</p>';
    feedback.hidden = true;
    feedback.innerHTML = '';
    validateButton.disabled = true;
    nextButton.disabled = true;
  }

  function updateActionButtons() {
    var hasQuestions = state.questions.length > 0;
    validateButton.disabled = !hasQuestions || state.selectedChoice === null || state.validated;
    nextButton.disabled = !hasQuestions || !state.validated;
  }

  function renderCurrentQuestion() {
    var question;
    var choicesHtml;

    if (!state.questions.length) {
      resetQuizDisplay();
      return;
    }

    question = state.questions[state.currentIndex];
    choicesHtml = question.choices.map(function (choice, index) {
      var classes = ['automatismes-choice'];
      if (state.selectedChoice === index) {
        classes.push('is-selected');
      }
      if (state.validated && index === question.answer) {
        classes.push('is-correct');
      }
      if (state.validated && state.selectedChoice === index && index !== question.answer) {
        classes.push('is-wrong');
      }

      return (
        '<button type="button" class="' + classes.join(' ') + '" data-choice-index="' + index + '">' +
          '<span class="automatismes-choice-text">' + choice + '</span>' +
        '</button>'
      );
    }).join('');

    output.innerHTML =
      '<p class="kholle-meta">Thème : ' + escapeHtml(state.themeName) + '</p>' +
      '<p class="kholle-meta">Score actuel : <span class="kholle-stars">' + escapeHtml(String(state.score)) + '</span> / ' + escapeHtml(String(state.currentIndex)) + '</p>' +
      '<article class="quiz-card">' +
        '<div class="quiz-face">' +
          '<h3 class="kholle-section-title">Question ' + escapeHtml(String(state.currentIndex + 1)) + ' / 12</h3>' +
          '<p>' + question.question + '</p>' +
        '</div>' +
        '<div class="automatismes-choices">' + choicesHtml + '</div>' +
      '</article>';

    if (state.validated && state.selectedChoice !== question.answer) {
      feedback.hidden = false;
      feedback.innerHTML =
        '<h3 class="kholle-section-title">Détail de la réponse</h3>' +
        '<p><strong>Bonne réponse :</strong> ' + question.choices[question.answer] + '</p>' +
        '<p>' + (question.explanation || 'Relis la règle de cours associée puis compare avec la bonne proposition.') + '</p>';
    } else {
      feedback.hidden = true;
      feedback.innerHTML = '';
    }

    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      window.MathJax.typesetClear([output, feedback]);
      window.MathJax.typesetPromise([output, feedback]);
    }

    updateActionButtons();
  }

  function showFinalScore() {
    output.innerHTML =
      '<article class="quiz-card">' +
        '<div class="quiz-face">' +
          '<h3 class="kholle-section-title">Quiz terminé</h3>' +
          '<p>Thème choisi : <strong>' + escapeHtml(state.themeName) + '</strong></p>' +
          '<p class="automatismes-final-score">Score final : <strong>' + escapeHtml(String(state.score)) + ' / 12</strong></p>' +
        '</div>' +
      '</article>';
    validateButton.disabled = true;
    nextButton.disabled = true;
    message.classList.add('is-success');
    message.textContent = 'Quiz terminé.';
  }

  form.addEventListener('submit', function (event) {
    var themeId;
    var pool;

    event.preventDefault();
    themeId = getSelectedThemeId();
    pool = shuffle(getQuestionPool(themeId));

    if (pool.length < 12) {
      resetQuizDisplay();
      message.classList.remove('is-success');
      message.textContent = 'Il faut au moins 12 questions disponibles pour lancer ce quiz.';
      return;
    }

    state.questions = pool.slice(0, 12);
    state.currentIndex = 0;
    state.selectedChoice = null;
    state.validated = false;
    state.score = 0;
    state.themeName = themeId === 'all'
      ? 'Mélange de tous les thèmes'
      : data.themes.find(function (theme) { return theme.id === themeId; }).name;

    message.classList.add('is-success');
    message.textContent = 'Quiz lancé avec succès.';
    renderCurrentQuestion();
  });

  output.addEventListener('click', function (event) {
    var button;
    var index;

    button = event.target.closest('[data-choice-index]');
    if (!button || state.validated) {
      return;
    }

    index = parseInt(button.getAttribute('data-choice-index'), 10);
    state.selectedChoice = index;
    renderCurrentQuestion();
  });

  validateButton.addEventListener('click', function () {
    var question;

    if (!state.questions.length || state.selectedChoice === null || state.validated) {
      return;
    }

    question = state.questions[state.currentIndex];
    state.validated = true;
    if (state.selectedChoice === question.answer) {
      state.score += 1;
    }
    renderCurrentQuestion();
  });

  nextButton.addEventListener('click', function () {
    if (!state.validated) {
      return;
    }

    if (state.currentIndex >= state.questions.length - 1) {
      showFinalScore();
      return;
    }

    state.currentIndex += 1;
    state.selectedChoice = null;
    state.validated = false;
    renderCurrentQuestion();
  });

  resetButton.addEventListener('click', function () {
    form.reset();
    message.classList.remove('is-success');
    message.textContent = '';
    resetQuizDisplay();
    renderThemeOptions();
  });

  renderThemeOptions();
  resetQuizDisplay();
})();
