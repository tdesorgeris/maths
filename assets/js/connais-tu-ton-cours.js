(function () {
  var data = window.COURSE_CARDS_DATA;
  var form = document.getElementById('course-quiz-form');
  var themeOptions = document.getElementById('quiz-theme-options');
  var output = document.getElementById('quiz-output');
  var message = document.getElementById('quiz-message');
  var revealButton = document.getElementById('quiz-reveal');
  var validateButton = document.getElementById('quiz-validate');
  var nextButton = document.getElementById('quiz-next');
  var prevButton = document.getElementById('quiz-prev');
  var resetButton = document.getElementById('quiz-reset');
  var notesInput = document.getElementById('quiz-notes');
  var notesPreview = document.getElementById('quiz-notes-preview');
  var answerOutput = document.getElementById('quiz-answer-output');
  var compareBox = document.getElementById('quiz-compare-box');
  var markCorrectButton = document.getElementById('quiz-mark-correct');
  var markWrongButton = document.getElementById('quiz-mark-wrong');
  var scoreCorrect = document.getElementById('quiz-score-correct');
  var scoreWrong = document.getElementById('quiz-score-wrong');
  var state = {
    cards: [],
    track: 'sup',
    themeName: '',
    currentIndex: 0,
    revealed: false,
    correct: 0,
    wrong: 0,
    answered: false
  };

  if (!data || !Array.isArray(data.themes) || !form || !themeOptions || !output || !message || !revealButton || !validateButton || !nextButton || !prevButton || !resetButton || !notesInput || !notesPreview || !answerOutput || !compareBox || !markCorrectButton || !markWrongButton || !scoreCorrect || !scoreWrong) {
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

  function getSelectedTrack() {
    var input = form.querySelector('input[name="quiz-track"]:checked');
    return input ? input.value : 'sup';
  }

  function getSelectedTheme() {
    var input = form.querySelector('input[name="quiz-theme"]:checked');
    return input ? input.value : '';
  }

  function updateButtons() {
    var hasCards = state.cards.length > 0;
    revealButton.disabled = !hasCards;
    validateButton.disabled = !hasCards || state.revealed;
    prevButton.disabled = !hasCards || state.currentIndex === 0;
    nextButton.disabled = !hasCards || state.currentIndex === state.cards.length - 1;
    markCorrectButton.disabled = !hasCards || !state.revealed || state.answered;
    markWrongButton.disabled = !hasCards || !state.revealed || state.answered;
    revealButton.textContent = state.revealed ? 'Réponse affichée' : 'Voir la réponse';
  }

  function updateScoreboard() {
    scoreCorrect.textContent = String(state.correct);
    scoreWrong.textContent = String(state.wrong);
  }

  function renderNotesPreview() {
    var text = notesInput.value.trim();

    if (!text) {
      notesPreview.innerHTML = '<p class="generator-placeholder">Ton aperçu apparaîtra ici.</p>';
    } else {
      notesPreview.innerHTML = '<p>' + escapeHtml(text).replace(/\n/g, '<br>') + '</p>';
    }

    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      window.MathJax.typesetClear([notesPreview]);
      window.MathJax.typesetPromise([notesPreview]);
    }
  }

  function resetNotes() {
    notesInput.value = '';
    notesPreview.innerHTML = '<p class="generator-placeholder">Ton aperçu apparaîtra ici.</p>';
    answerOutput.innerHTML = '<p class="generator-placeholder">Clique sur "Voir la réponse" pour afficher la réponse attendue.</p>';
  }

  function renderCurrentCard() {
    var card;

    if (!state.cards.length) {
      output.innerHTML = '<p class="generator-placeholder">Aucune carte affichée pour le moment.</p>';
      answerOutput.innerHTML = '<p class="generator-placeholder">Clique sur "Voir la réponse" pour afficher la réponse attendue.</p>';
      compareBox.classList.remove('is-revealed');
      renderNotesPreview();
      updateButtons();
      return;
    }

    card = state.cards[state.currentIndex];

    output.innerHTML =
      '<p class="kholle-meta">Niveau : ' + escapeHtml(state.track === 'sup' ? "Sup'" : "Spé'") + '</p>' +
      '<p class="kholle-meta">Thème : ' + escapeHtml(state.themeName) + '</p>' +
      '<p class="kholle-meta">Carte ' + escapeHtml(String(state.currentIndex + 1)) + ' sur ' + escapeHtml(String(state.cards.length)) + '</p>' +
      '<article class="quiz-card">' +
        '<div class="quiz-face">' +
          '<h3 class="kholle-section-title">Question</h3>' +
          '<p>' + card.question + '</p>' +
        '</div>' +
      '</article>';

    answerOutput.innerHTML = state.revealed
      ? '<p>' + card.answer + '</p>'
      : '<p class="generator-placeholder">Clique sur "Voir la réponse" pour afficher la réponse attendue.</p>';
    compareBox.classList.toggle('is-revealed', state.revealed);

    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      window.MathJax.typesetClear([output, notesPreview, answerOutput]);
      window.MathJax.typesetPromise([output, notesPreview, answerOutput]);
    }

    updateButtons();
  }

  function moveToNextCardAfterMark() {
    if (state.currentIndex < state.cards.length - 1) {
      state.currentIndex += 1;
      state.revealed = false;
      state.answered = false;
      resetNotes();
      renderCurrentCard();
      return;
    }

    state.answered = true;
    message.classList.add('is-success');
    message.textContent = 'Fin du paquet.';
    updateButtons();
  }

  function showAnswer() {
    if (!state.cards.length) {
      return;
    }

    state.revealed = true;
    state.answered = false;
    renderCurrentCard();
  }

  function renderThemeOptions() {
    var selectedTrack = getSelectedTrack();
    var themes = data.themes.filter(function (theme) {
      return theme.track === selectedTrack;
    });

    themeOptions.innerHTML = themes.map(function (theme, index) {
      return (
        '<label class="generator-difficulty-option">' +
          '<input type="radio" name="quiz-theme" value="' + escapeHtml(theme.id) + '"' + (index === 0 ? ' checked' : '') + '>' +
          '<span>' + escapeHtml(theme.name) + '</span>' +
        '</label>'
      );
    }).join('');
  }

  function resetQuiz() {
    state.cards = [];
    state.themeName = '';
    state.currentIndex = 0;
    state.revealed = false;
    message.classList.remove('is-success');
    message.textContent = '';
    resetNotes();
    renderCurrentCard();
  }

  form.addEventListener('submit', function (event) {
    var themeId;
    var theme;

    event.preventDefault();
    themeId = getSelectedTheme();
    theme = data.themes.find(function (item) {
      return item.id === themeId;
    });

    if (!theme) {
      resetQuiz();
      message.textContent = 'Choisis un thème pour lancer le quiz.';
      return;
    }

    state.track = getSelectedTrack();
    state.themeName = theme.name;
    state.cards = shuffle(theme.cards);
    state.currentIndex = 0;
    state.revealed = false;
    state.answered = false;
    resetNotes();
    message.classList.add('is-success');
    message.textContent = 'Quiz lancé avec succès.';
    renderCurrentCard();
  });

  form.addEventListener('change', function (event) {
    if (event.target && event.target.name === 'quiz-track') {
      renderThemeOptions();
      resetQuiz();
    }
  });

  revealButton.addEventListener('click', function () {
    showAnswer();
  });

  validateButton.addEventListener('click', function () {
    showAnswer();
  });

  notesInput.addEventListener('input', renderNotesPreview);

  nextButton.addEventListener('click', function () {
    if (!state.cards.length || state.currentIndex >= state.cards.length - 1) {
      return;
    }

    state.currentIndex += 1;
    state.revealed = false;
    state.answered = false;
    resetNotes();
    renderCurrentCard();
  });

  prevButton.addEventListener('click', function () {
    if (!state.cards.length || state.currentIndex <= 0) {
      return;
    }

    state.currentIndex -= 1;
    state.revealed = false;
    state.answered = false;
    resetNotes();
    renderCurrentCard();
  });

  markCorrectButton.addEventListener('click', function () {
    if (!state.cards.length || state.answered) {
      return;
    }

    state.correct += 1;
    state.answered = true;
    updateScoreboard();
    moveToNextCardAfterMark();
  });

  markWrongButton.addEventListener('click', function () {
    if (!state.cards.length || state.answered) {
      return;
    }

    state.wrong += 1;
    state.answered = true;
    updateScoreboard();
    moveToNextCardAfterMark();
  });

  resetButton.addEventListener('click', function () {
    form.reset();
    state.correct = 0;
    state.wrong = 0;
    updateScoreboard();
    renderThemeOptions();
    resetQuiz();
  });

  renderThemeOptions();
  updateScoreboard();
  resetNotes();
  renderNotesPreview();
  renderCurrentCard();
})();
