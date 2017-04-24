'use strict';
import Loader from '../classes/loader';
import ArtistList from '../classes/artistList';

export function generateRange(currPage, maxPages) {
  let arr = [];

  currPage = Number.parseInt(currPage);
  maxPages = Number.parseInt(maxPages);

  const vault = 3;
  let start, end;
  if (currPage < vault + 1) {
    start = 1;
    end = (2 * vault) + 1;
  } else if (currPage > maxPages - vault) {
    start = maxPages - ((2 * vault) + 1);
    end = maxPages;
  } else {
    start = currPage - vault;
    end = currPage + vault;
  }
  console.log(start, end);

  for (let i = start; i <= end; i++) {
    arr.push(i);
  }

  return arr;
}

function addPagingScroll(attr) {
  if (!(attr instanceof Object) && !attr['page']) return;

  const currentPage = attr['page'];
  let arr = generateRange(currentPage, attr['totalPages']);

  let pageNumbers = document.querySelector('.result-scroll');
  pageNumbers.innerHTML = '';
  let elements = document.createDocumentFragment();

  for (let elem of arr) {
    let li = document.createElement('li');
    li.innerHTML = elem;
    li.addEventListener('click', function () {
      loadTopArtistsOnPage(elem);
    });
    if (currentPage == elem) {
      li.classList.add('current');
    }
    elements.appendChild(li);
  }
  pageNumbers.appendChild(elements);
}

function addImage(artist, root) {
  let image = document.createElement('img');
  image.src = artist['image'][2]['#text'];
  image.title = artist.name;
  image.classList.add('element');
  root.appendChild(image);
  return image;
}

function parseResponseOfTopArtists(response, type) {
  if (!type instanceof Loader) return;

  let resultBox = document.querySelector('.result-box');
  resultBox.innerHTML = '';
  let elements = document.createDocumentFragment();
  let resultFromResponse = JSON.parse(response.responseText);

  const artistsFromJSON = resultFromResponse['artists'];
  let length = artistsFromJSON['artist']['length'];

  for (let i = 0; i < length; i++) {
    let artist = artistsFromJSON['artist'][i];
    addImage(artist, elements).addEventListener('click', function (event) {
      alert(event.currentTarget.title);
    });
  }
  resultBox.appendChild(elements);
  let pageAttr = artistsFromJSON['@attr'];
  addPagingScroll(pageAttr, resultBox);
}

function loadTopArtistsOnPage(number) {
  if (typeof (number) === 'object') {
    number = 1;
  }
  number = number || 1;
  addSpinner();
  let loader = new ArtistList();
  let response = loader.load(number);
  response
    .then(res => parseResponseOfTopArtists(res, loader));
}

export function addSpinner() {
  const resultBox = document.querySelector('.result-box');
  resultBox.innerHTML = '';
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  resultBox.appendChild(spinner);
}

window.onload = loadTopArtistsOnPage;
