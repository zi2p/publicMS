import coefficientStudent from "./constants.js";

clearParagraphs()

let chart = null;
let chartExists = false;

function handleFile(file) {
  const reader = new FileReader();

  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);

    const workbook = XLSX.read(data, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    const allValues = jsonData
      .map((row) => Object.values(row))
      .flat()
      .map((value) => parseFloat(value))
      .filter((value) => !isNaN(value));

    const average = calculateAverage(allValues);
    const standardDeviation = calculateDeviation(allValues, average);
    const confidenceInterval = calculateConfidenceInterval(allValues.length, standardDeviation);
    const sigma = calculateSigma(allValues, average);
    const timesForGauss = calculateAverageInIntervals(allValues);

    clearParagraphs();

    if (chartExists) {
      chart.destroy()
    }

    if (isNaN(validateFile(allValues))) {
      document.getElementById("warning").style.display = "block";
      document.getElementById("warning").innerText = "Файл содержит неправильное количество элементов или пустой";
    } else {
      document.getElementById("resultAverage").style.display = "block";
      document.getElementById("resultStandardDeviation").style.display = "block";
      document.getElementById("resultConfidenceInterval").style.display = "block";
      document.getElementById("resultAverage").innerText = `Среднее значение: ${average}`;
      document.getElementById("resultStandardDeviation").innerText = `СКО среднего значения: ${standardDeviation}`;
      document.getElementById("resultConfidenceInterval").innerText = `Доверительный интервал: ${confidenceInterval}`;

      chart = buildChart(calculateDevision(allValues), sigma, timesForGauss, average);
      chartExists = true;
    }
  };
  reader.readAsArrayBuffer(file);
}

function buildChart(devision, sigma, timesForGauss, average) {
  var ctx = document.getElementById('myChart').getContext('2d');
  var histogramData = {
    datasets: [{
      label: 'Гистограмма',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      barPercentage: 1.27,
      data: devision,
      type: 'bar',
    }]
  };

  var gaussData = {
    datasets: [
      {
        label: 'Функция Гаусса',
        data: [],
        backgroundColor: 'rgba(148, 0, 211, 0.4)',
        borderColor: 'rgba(148, 0, 211, 1)',
        borderWidth: 1,
        pointRadius: 4,
        type: 'line',
        tension: 0.4,
      }
    ]
  };

  var gauss_var = sigma;
  var gauss_mean = average;

  for (var i = 0; i < timesForGauss.length; i++) {
    gaussData.datasets[0].data[i] = (1 / (gauss_var * Math.sqrt(2 * Math.PI))) * Math.exp(-1 * ((timesForGauss[i] - gauss_mean) * (timesForGauss[i] - gauss_mean)) / (2 * gauss_var * gauss_var));
  }

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: histogramData,
    options: {
      scales: {
        y: {
          beginAtZero: true
        },
        x: {
          ticks: {
            font: {
              size: 9
            }
          }
        },
      },
    },
  });

  myChart.data.datasets.push(gaussData.datasets[0]);
  myChart.update();

  return myChart;
}

function calculateSigma(data, average) {
  let squareSums = 0
  for (let i = 0; i < data.length; i++) {
    squareSums += Math.pow((data[i] - average), 2)
  }
  const sigma = Math.sqrt(1 / (data.length - 1) * squareSums, 2);
  return parseFloat(sigma.toFixed(3))
}

function calculateAverageInIntervals(data) {
  const maxValue = Math.max.apply(null, data);
  const minValue = Math.min.apply(null, data);
  const step = (maxValue - minValue) / 10;
  const intervals = [minValue];

  let i = 0;
  while (intervals[i] < maxValue) {
    let newValue = intervals[i] + step;
    intervals.push(parseFloat(newValue.toFixed(2)));
    i++;
  }

  let timesForGauss = []
  let stepInIntervals = step / 2
  for (let i = 0; i < intervals.length - 1; i++) {
    timesForGauss.push(intervals[i] + stepInIntervals)
  }

  return timesForGauss;
}

function calculateDevision(data) {
  const maxValue = Math.max.apply(null, data);
  const minValue = Math.min.apply(null, data);
  const step = (maxValue - minValue) / 10;
  const intervals = [minValue];

  let i = 0;
  while (intervals[i] < maxValue) {
    let newValue = intervals[i] + step;
    intervals.push(parseFloat(newValue.toFixed(2)));
    i++;
  }

  const valuesInIntervals = {};
  for (let j = 1; j < intervals.length; j++) {
    const intervalKey = `${intervals[j - 1]} - ${intervals[j]}`;
    valuesInIntervals[intervalKey] = 0;
  }

  for (let i = 0; i < data.length; i++) {
    for (let j = 1; j < intervals.length; j++) {
      if (data[i] <= intervals[j] && data[i] >= intervals[j - 1]) {
        const intervalKey = `${intervals[j - 1]} - ${intervals[j]}`;
        if (!valuesInIntervals[intervalKey]) {
          valuesInIntervals[intervalKey] = 1;
        }
        else {
          valuesInIntervals[intervalKey] += 1;
        }
        break;
      }
    }
  }

  const devision = {}
  for (let j = 1; j < intervals.length; j++) {
    const intervalKey = `${intervals[j - 1]} - ${intervals[j]}`;
    devision[intervalKey] = valuesInIntervals[intervalKey] / (100 * step);
  }

  return devision
}

function validateFile(data) {
  if (data.length < 50 || data.length > 100) {
    return NaN;
  }

  return true;
}

function clearParagraphs() {
  document.getElementById("warning").style.display = "none";
  document.getElementById("resultAverage").style.display = "none";
  document.getElementById("resultStandardDeviation").style.display = "none";
  document.getElementById("resultConfidenceInterval").style.display = "none";
}

function calculateAverage(values) {
  const sum = values.reduce((acc, val) => acc + val, 0);
  const average = sum / values.length;
  return parseFloat(average.toFixed(2));
}

function calculateDeviation(data, average) {
  let sumOfTimesSquare = 0;
  for (let i = 0; i < data.length; i++) {
    sumOfTimesSquare += Math.pow(data[i] - average, 2);
  }

  const N = data.length;

  const Deviation = Math.pow((1 / (N * (N - 1))) * sumOfTimesSquare, 0.5);
  return parseFloat(Deviation.toFixed(3));
}

function calculateConfidenceInterval(N, standardDeviation) {
  const confidenceInterval = coefficientStudent[N] * standardDeviation;
  return parseFloat(confidenceInterval.toFixed(2));
}

function readFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (file) {
    const fileName = file.name;

    if (fileName.endsWith(".xlsx")) {
      handleFile(file);
    } else {
      alert("Пожалуйста выберите файл с .xlsx расширением");
    }
  } else {
    alert("Пожалуйста выберите файл");
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    readFile();
  }
});

window.readFile = readFile;