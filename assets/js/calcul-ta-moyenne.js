(function () {
  var form = document.getElementById('moyenne-form');
  var dsCountInput = document.getElementById('ds-count');
  var evaluationCountInput = document.getElementById('evaluation-count');
  var dsInputsContainer = document.getElementById('ds-inputs');
  var evaluationInputsContainer = document.getElementById('evaluation-inputs');
  var participationOptions = document.getElementById('participation-options');
  var message = document.getElementById('moyenne-message');
  var resultCard = document.getElementById('moyenne-result');
  var finalValue = document.getElementById('moyenne-final-value');
  var breakdown = document.getElementById('moyenne-breakdown');
  var chart = document.getElementById('moyenne-chart');
  var legend = document.getElementById('moyenne-legend');
  var resetButton = document.getElementById('moyenne-reset');
  var state = {
    participationValue: null
  };
  var chartColors = ['#ef476f', '#f78c6b', '#ffd166', '#06d6a0', '#118ab2', '#6c63ff', '#4d908e', '#577590', '#bc5090', '#ff7f51'];

  if (!form || !dsCountInput || !evaluationCountInput || !dsInputsContainer || !evaluationInputsContainer || !participationOptions || !message || !resultCard || !finalValue || !breakdown || !chart || !legend || !resetButton) {
    return;
  }

  function clampCount(value, min, max) {
    var number = parseInt(value, 10);
    if (Number.isNaN(number)) {
      return min;
    }
    return Math.min(max, Math.max(min, number));
  }

  function roundTo(value, digits) {
    var factor = Math.pow(10, digits);
    return Math.round(value * factor) / factor;
  }

  function formatNote(value) {
    return roundTo(value, 2).toFixed(2).replace('.', ',');
  }

  function createInputs(container, prefix, count, labelText) {
    var html = [];
    var index;

    for (index = 0; index < count; index += 1) {
      html.push(
        '<label class="moyenne-note-field" for="' + prefix + '-' + index + '">' +
          '<span>' + labelText + ' ' + (index + 1) + '</span>' +
          '<input type="number" id="' + prefix + '-' + index + '" name="' + prefix + '-' + index + '" min="0" max="20" step="0.25" placeholder="sur 20">' +
        '</label>'
      );
    }

    if (!html.length) {
      html.push('<p class="generator-placeholder">Aucune note à renseigner pour le moment.</p>');
    }

    container.innerHTML = html.join('');
  }

  function renderNoteInputs() {
    var dsCount = clampCount(dsCountInput.value, 0, 12);
    var evaluationCount = clampCount(evaluationCountInput.value, 0, 30);
    dsCountInput.value = dsCount;
    evaluationCountInput.value = evaluationCount;
    createInputs(dsInputsContainer, 'ds-note', dsCount, 'DS');
    createInputs(evaluationInputsContainer, 'evaluation-note', evaluationCount, 'Évaluation');
  }

  function getNumericValues(container) {
    var inputs = Array.prototype.slice.call(container.querySelectorAll('input'));
    var values = [];
    var hasEmpty = false;

    inputs.forEach(function (input) {
      var value = input.value.trim();
      var number;

      if (!value) {
        hasEmpty = true;
        return;
      }

      number = parseFloat(value.replace(',', '.'));
      if (Number.isNaN(number) || number < 0 || number > 20) {
        hasEmpty = true;
        return;
      }

      values.push(number);
    });

    return {
      values: values,
      isComplete: !hasEmpty && values.length === inputs.length
    };
  }

  function polarToCartesian(cx, cy, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: cx + (radius * Math.cos(angleInRadians)),
      y: cy + (radius * Math.sin(angleInRadians))
    };
  }

  function describeArc(cx, cy, radius, startAngle, endAngle) {
    var start = polarToCartesian(cx, cy, radius, endAngle);
    var end = polarToCartesian(cx, cy, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M', cx, cy,
      'L', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      'Z'
    ].join(' ');
  }

  function renderChart(parts) {
    var centerX = 180;
    var centerY = 180;
    var radius = 130;
    var total = parts.length;
    var angleSize = 360 / total;
    var slices = [];
    var labels = [];

    parts.forEach(function (part, index) {
      var startAngle = index * angleSize;
      var endAngle = startAngle + angleSize;
      var middleAngle = startAngle + angleSize / 2;
      var labelPoint = polarToCartesian(centerX, centerY, 85, middleAngle);
      var color = chartColors[index % chartColors.length];

      slices.push(
        '<path d="' + describeArc(centerX, centerY, radius, startAngle, endAngle) + '" fill="' + color + '" stroke="#ffffff" stroke-width="3"></path>'
      );

      slices.push(
        '<text x="' + labelPoint.x + '" y="' + labelPoint.y + '" text-anchor="middle" dominant-baseline="middle" class="moyenne-chart-text">' +
          formatNote(part.value) +
        '</text>'
      );

      labels.push(
        '<li>' +
          '<span class="moyenne-legend-color" style="background:' + color + ';"></span>' +
          '<span><strong>' + part.label + '</strong> : ' + formatNote(part.value) + ' / 20</span>' +
        '</li>'
      );
    });

    chart.innerHTML = slices.join('');
    legend.innerHTML = labels.join('');
  }

  function setMessage(text, isSuccess) {
    message.textContent = text;
    message.classList.toggle('is-success', Boolean(isSuccess));
  }

  function calculateAverage(event) {
    var dsData;
    var evaluationData;
    var dsAverageContribution;
    var evaluationAverage;
    var globalAverage;
    var parts;

    event.preventDefault();

    if (state.participationValue === null) {
      setMessage('Choisis d’abord ton niveau de participation en classe.', false);
      resultCard.hidden = true;
      return;
    }

    dsData = getNumericValues(dsInputsContainer);
    evaluationData = getNumericValues(evaluationInputsContainer);

    if (!dsData.isComplete || !evaluationData.isComplete) {
      setMessage('Renseigne toutes les notes avec des valeurs entre 0 et 20.', false);
      resultCard.hidden = true;
      return;
    }

    evaluationAverage = (evaluationData.values.reduce(function (sum, value) {
      return sum + value;
    }, 0) + state.participationValue) / (evaluationData.values.length + 1);

    if (dsData.values.length === 0) {
      globalAverage = evaluationAverage;
      parts = [
        { label: 'Évaluations + participation', value: evaluationAverage }
      ];
    } else {
      dsAverageContribution = dsData.values.reduce(function (sum, value) {
        return sum + value;
      }, 0);
      globalAverage = (dsAverageContribution + evaluationAverage) / (dsData.values.length + 1);
      parts = dsData.values.map(function (value, index) {
        return {
          label: 'DS ' + (index + 1),
          value: value
        };
      });
      parts.push({
        label: 'Évaluations + participation',
        value: evaluationAverage
      });
    }

    finalValue.textContent = formatNote(globalAverage);
    breakdown.textContent = 'La moyenne des évaluations et de la participation vaut ' + formatNote(evaluationAverage) + ' / 20 et complète la moyenne globale comme une part supplémentaire.';
    renderChart(parts);
    resultCard.hidden = false;
    setMessage('Calcul effectué avec succès.', true);
  }

  dsCountInput.addEventListener('input', renderNoteInputs);
  evaluationCountInput.addEventListener('input', renderNoteInputs);

  participationOptions.addEventListener('click', function (event) {
    var button = event.target.closest('[data-participation-value]');
    var buttons;

    if (!button) {
      return;
    }

    state.participationValue = parseFloat(button.getAttribute('data-participation-value'));
    buttons = participationOptions.querySelectorAll('.moyenne-participation-button');
    Array.prototype.forEach.call(buttons, function (item) {
      item.classList.toggle('is-selected', item === button);
    });
  });

  resetButton.addEventListener('click', function () {
    var buttons = participationOptions.querySelectorAll('.moyenne-participation-button');
    form.reset();
    state.participationValue = null;
    Array.prototype.forEach.call(buttons, function (button) {
      button.classList.remove('is-selected');
    });
    renderNoteInputs();
    resultCard.hidden = true;
    chart.innerHTML = '';
    legend.innerHTML = '';
    setMessage('', false);
  });

  form.addEventListener('submit', calculateAverage);

  renderNoteInputs();
})();
