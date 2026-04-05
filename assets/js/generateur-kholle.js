(function () {
  var data = window.KHOLLES_DATA;
  var themesContainer = document.getElementById('themes-list');
  var form = document.getElementById('kholle-generator-form');
  var output = document.getElementById('kholle-output');
  var message = document.getElementById('generator-message');
  var downloadButton = document.getElementById('download-tex');
  var clearButton = document.getElementById('clear-kholle');
  var currentKholle = null;

  if (!data || !Array.isArray(data.themes) || !themesContainer || !form || !output || !message || !downloadButton || !clearButton) {
    return;
  }

  function resetOutput() {
    currentKholle = null;
    downloadButton.disabled = true;
    output.innerHTML = '<p class="generator-placeholder">Aucune khôlle générée pour le moment.</p>';
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function toLatex(text) {
    return String(text)
      .replace(/\\/g, '\\textbackslash{}')
      .replace(/&/g, '\\&')
      .replace(/%/g, '\\%')
      .replace(/\$/g, '\\$')
      .replace(/#/g, '\\#')
      .replace(/_/g, '\\_')
      .replace(/\{/g, '\\{')
      .replace(/\}/g, '\\}')
      .replace(/\^/g, '\\textasciicircum{}')
      .replace(/~/g, '\\textasciitilde{}');
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

  function pickOne(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function renderThemes() {
    var selectedTrack = getSelectedTrack();
    var themes = data.themes.filter(function (theme) {
      return theme.track === selectedTrack;
    });

    themesContainer.innerHTML = themes.map(function (theme) {
      return (
        '<div class="generator-theme-option">' +
          '<label>' +
            '<input type="checkbox" name="theme" value="' + escapeHtml(theme.id) + '">' +
            '<span>' +
              '<span class="generator-theme-name">' + escapeHtml(theme.name) + '</span>' +
              '<span class="generator-theme-description">' + escapeHtml(theme.description) + '</span>' +
            '</span>' +
          '</label>' +
        '</div>'
      );
    }).join('');

    updateSelectedThemeStyles();
  }

  function updateSelectedThemeStyles() {
    var options = themesContainer.querySelectorAll('.generator-theme-option');

    Array.prototype.forEach.call(options, function (option) {
      var input = option.querySelector('input[name="theme"]');

      if (input && input.checked) {
        option.classList.add('is-selected');
      } else {
        option.classList.remove('is-selected');
      }
    });
  }

  function getSelectedThemes() {
    var checked = form.querySelectorAll('input[name="theme"]:checked');
    return Array.prototype.map.call(checked, function (input) {
      return data.themes.find(function (theme) {
        return theme.id === input.value;
      });
    }).filter(Boolean);
  }

  function getSelectedDifficulty() {
    var input = form.querySelector('input[name="difficulty"]:checked');
    return input ? parseInt(input.value, 10) : 1;
  }

  function getSelectedTrack() {
    var input = form.querySelector('input[name="track"]:checked');
    return input ? input.value : 'sup';
  }

  function buildStars(count) {
    return new Array(count + 1).join('★');
  }

  function buildKholle(selectedThemes, selectedDifficulty, selectedTrack) {
    var courseQuestions = selectedThemes.map(function (theme) {
      return {
        theme: theme.name,
        text: pickOne(theme.courseQuestions)
      };
    });

    var exercisePool = [];
    selectedThemes.forEach(function (theme) {
      theme.exercises.forEach(function (exercise) {
        if (exercise.difficulty === selectedDifficulty) {
          exercisePool.push({
            theme: theme.name,
            title: exercise.title,
            statement: exercise.statement,
            difficulty: exercise.difficulty
          });
        }
      });
    });

    var pickedExercises = shuffle(exercisePool).slice(0, Math.min(2, exercisePool.length));

    return {
      track: selectedTrack,
      themes: selectedThemes.map(function (theme) { return theme.name; }),
      difficulty: selectedDifficulty,
      courseQuestions: courseQuestions,
      exercises: pickedExercises
    };
  }

  function renderKholle(kholle) {
    var questionsHtml = kholle.courseQuestions.map(function (question) {
      return '<li><strong>' + escapeHtml(question.theme) + ' :</strong> ' + question.text + '</li>';
    }).join('');

    var exercisesHtml = kholle.exercises.map(function (exercise, index) {
      return (
        '<article class="kholle-exercise">' +
          '<h4>Exercice ' + (index + 1) + ' - ' + escapeHtml(exercise.theme) + '</h4>' +
          '<p><strong>' + escapeHtml(exercise.title) + '</strong><span class="kholle-stars">' + escapeHtml(buildStars(exercise.difficulty)) + '</span></p>' +
          '<p>' + exercise.statement + '</p>' +
        '</article>'
      );
    }).join('');

    output.innerHTML =
      '<p class="kholle-meta">Niveau : ' + escapeHtml(kholle.track === 'sup' ? "Sup'" : "Spé'") + '</p>' +
      '<p class="kholle-meta">Thèmes retenus : ' + escapeHtml(kholle.themes.join(', ')) + '</p>' +
      '<p class="kholle-meta">Difficulté choisie : <span class="kholle-stars">' + escapeHtml(buildStars(kholle.difficulty)) + '</span></p>' +
      '<h3 class="kholle-section-title">Question de cours</h3>' +
      '<ol class="kholle-list">' + questionsHtml + '</ol>' +
      '<h3 class="kholle-section-title">Exercices</h3>' +
      '<div class="kholle-exercises">' + exercisesHtml + '</div>';

    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      window.MathJax.typesetClear([output]);
      window.MathJax.typesetPromise([output]);
    }
  }

  function buildLatex(kholle) {
    var lines = [
      '\\documentclass[11pt]{article}',
      '\\usepackage[utf8]{inputenc}',
      '\\usepackage[T1]{fontenc}',
      '\\usepackage[french]{babel}',
      '\\usepackage[a4paper,margin=2.2cm]{geometry}',
      '\\begin{document}',
      '\\section*{Kh\\^olle de math\\\'ematiques}',
      '\\textbf{Niveau :} ' + toLatex(kholle.track === 'sup' ? "Sup'" : "Sp\\'e'"),
      '\\\\',
      '\\textbf{Th\\`emes :} ' + toLatex(kholle.themes.join(', ')),
      '\\\\',
      '\\textbf{Difficult\\' + 'e :} ' + toLatex(buildStars(kholle.difficulty)),
      '',
      '\\subsection*{Question de cours}',
      '\\begin{enumerate}'
    ];

    kholle.courseQuestions.forEach(function (question) {
      lines.push('\\item \\textbf{' + toLatex(question.theme) + '} : ' + toLatex(question.text));
    });

    lines.push('\\end{enumerate}');
    lines.push('');
    lines.push('\\subsection*{Exercices}');
    lines.push('\\begin{enumerate}');

    kholle.exercises.forEach(function (exercise) {
      lines.push('\\item \\textbf{' + toLatex(exercise.title) + '} (' + toLatex(exercise.theme) + ')');
      lines.push(toLatex(exercise.statement));
    });

    lines.push('\\end{enumerate}');
    lines.push('\\end{document}');

    return lines.join('\n');
  }

  function downloadLatex() {
    if (!currentKholle) {
      return;
    }

    var blob = new Blob([buildLatex(currentKholle)], { type: 'application/x-tex;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');

    link.href = url;
    link.download = 'kholle.tex';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  form.addEventListener('submit', function (event) {
    var selectedThemes;
    var selectedDifficulty;
    var selectedTrack;

    event.preventDefault();
    selectedThemes = getSelectedThemes();
    selectedDifficulty = getSelectedDifficulty();
    selectedTrack = getSelectedTrack();

    if (selectedThemes.length < 1 || selectedThemes.length > 3) {
      resetOutput();
      message.classList.remove('is-success');
      message.textContent = 'Sélectionne entre 1 et 3 thèmes pour générer une khôlle.';
      return;
    }

    currentKholle = buildKholle(selectedThemes, selectedDifficulty, selectedTrack);

    if (currentKholle.exercises.length < 2) {
      resetOutput();
      message.classList.remove('is-success');
      message.textContent = 'Pas assez d’exercices disponibles pour cette difficulté avec les thèmes choisis.';
      return;
    }

    renderKholle(currentKholle);
    downloadButton.disabled = false;
    message.classList.add('is-success');
    message.textContent = 'Khôlle générée avec succès.';
  });

  downloadButton.addEventListener('click', downloadLatex);
  clearButton.addEventListener('click', function () {
    form.reset();
    renderThemes();
    updateSelectedThemeStyles();
    resetOutput();
    message.classList.remove('is-success');
    message.textContent = '';
  });
  form.addEventListener('change', function (event) {
    if (event.target && event.target.name === 'track') {
      renderThemes();
      resetOutput();
      message.classList.remove('is-success');
      message.textContent = '';
    }
  });
  themesContainer.addEventListener('change', updateSelectedThemeStyles);

  renderThemes();
  resetOutput();
})();
