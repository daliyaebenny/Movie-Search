const form = document.querySelector('form');
const input = document.querySelector('#searchTerm');
const resultsSection = document.querySelector('#results');

const API_URL = 'https://www.omdbapi.com/?apikey=45fd9a44&type=movie&t=';

form.addEventListener('submit', formsubmitted);

function formsubmitted(event) {
  event.preventDefault();
  const searchTerm = input.value;
  getResults(searchTerm);
}

function getResults(searchTerm) {
  const url = `${API_URL}${searchTerm}`;

  fetch(url)
    .then(response => response.json())
    .then(data => showResults(data));
}

function showResults(results) {
  resultsSection.innerHTML = '';
  let html = '';

  Object.keys(results).forEach(function (key) {
    let strkey = key
    let strValue = results[key]
    html += `<h7><br>${strkey}: ${strValue}<h7>`;
  });

  resultsSection.innerHTML = html;
}



