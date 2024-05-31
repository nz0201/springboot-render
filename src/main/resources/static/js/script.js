//add row

var count = 1;

function addRow() {
  var table = document.querySelector('table');
  var newRow = document.createElement('tr');

  count++;

  newRow.innerHTML = `
  <td>Activity ${count}</td>
  <td>A${count}</td>
  <td><input class="weight" type="text" value=""></td>
  <td><input class="grade" type="text" value=""> / <input class="grade" type="text" value=""></td>
  <td class="percent"> </td>
  `;

  table.appendChild(newRow);
}

//calculate percent
var table = document.getElementById('table');

function calculatePercent(row) {
  var gradeInputs = row.querySelectorAll('.grade');
  var percentCell = row.querySelector('.percent');

  var numer = parseFloat(gradeInputs[0].value);
  var denom = parseFloat(gradeInputs[1].value);

  if (!isNaN(numer) && !isNaN(denom)) {
    var result = numer / denom * 100;

    if (result % 1 !== 0)
      result = result.toFixed(2);

    percentCell.textContent = result + "%";
  } else {
    percentCell.textContent = "";
  }
} 

table.addEventListener('input', function (event) {
  var target = event.target;
  if (target.classList.contains('grade')) {
    var row = target.closest('tr');
    calculatePercent(row);
  }
});

//table data
function getActivityData() {
  var inputs = document.querySelectorAll('td input');

  var activityDatas = []; 

  for (var i = 0; i < inputs.length; i += 3) {
    var data = {
      weight: inputs[i].value,
      gradeNumerator: inputs[i + 1].value,
      gradeDenominator: inputs[i + 2].value
    };

    var numer = parseFloat(data.gradeNumerator);
    var denom = parseFloat(data.gradeDenominator);

    if (!isNaN(numer) && !isNaN(denom)) {
      var result = numer / denom * 100;
      data.percent = result;
    } else
      data.percent = 0;

    activityDatas.push(data);
  }

  return activityDatas;
}

//calculate mean
function calculateMean() {
  var activityData = getActivityData();

  var totalPercent = 0;

  var validRowCount = 0;

  for (var i = 0; i < activityData.length; i++) {
    if (activityData[i].percent) {
      totalPercent += activityData[i].percent;
      validRowCount++;
    }
  }

  var mean = totalPercent / validRowCount;

  var resultCell = document.getElementById('underResult');
  if (!isNaN(mean)) {
    if (mean % 1 !== 0)
      mean = mean.toFixed(2);

    resultCell.textContent = mean + "/100";
  } else
    resultCell.textContent = "";
}

//calculate weighted 
function calculateWeighted() {
  var activityData = getActivityData();

  var totalPercentByWeight = 0;
  var totalWeight = 0;

  for (var i = 0; i < activityData.length; i++) {
    var percentByWeight = activityData[i].percent * activityData[i].weight;
    totalPercentByWeight += percentByWeight;
    totalWeight += Number(activityData[i].weight);
  }

  var weighted = totalPercentByWeight / totalWeight;

  var resultCell = document.getElementById('underResult');
  if (!isNaN(weighted)) {
    if (weighted % 1 !== 0)
      weighted = weighted.toFixed(2);

    resultCell.textContent = weighted + "/100";
  } else
    resultCell.textContent = "";
}

