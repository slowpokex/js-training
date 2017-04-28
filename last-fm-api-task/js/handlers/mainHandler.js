'use strict';
import ArtistList from '../classes/artistList';
import * as artistHandler from '../handlers/artistHandler';

function generateRangeForPagination(currPage, maxPages) {
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

  for (let i = start; i <= end; i++) {
    arr.push(i);
  }

  return arr;
}

export function clearPagingScroll() {
  const pageNumbers = document.querySelector('.result-scroll');
  if (pageNumbers !== null) {
    pageNumbers.style.display = 'none';
  }
}

export function showPagingScroll() {
  const pageNumbers = document.querySelector('.result-scroll');
  if (pageNumbers !== null) {
    pageNumbers.style.display = 'block';
  }
}

export function addPagingScroll(attr) {
  function addNumberPage(elem, fragment) {
    let li = document.createElement('li');
    li.innerHTML = elem;
    li.addEventListener('click', function () {
      loadTopArtistsOnPage(elem);
    });
    if (currentPage == elem) {
      li.classList.add('current');
    }
    fragment.appendChild(li);
  }

  if (!(attr instanceof Object) && !attr['page']) return;
  showPagingScroll();
  const currentPage = attr['page'];
  const totalPages = attr['totalPages'];

  const arr = generateRangeForPagination(currentPage, totalPages);
  const pageNumbers = document.querySelector('.result-scroll');
  pageNumbers.innerHTML = '';

  const fragment = document.createDocumentFragment();

  arr.forEach(function (elem) {
    addNumberPage(elem, fragment)
  });

  pageNumbers.appendChild(fragment);
}

export function addArtistImage(artist, root, clazz) {
  let image = document.createElement('img');
  image.src = artist['image'][2]['#text'];
  image.title = artist.name;
  image.className = clazz;
  root.appendChild(image);
  return image;
}

function handleResponseOfTopArtists(response) {
  if (!(response instanceof Object)) return;

  let resultBox = document.querySelector('.result-box');
  resultBox.innerHTML = '';
  let elements = document.createDocumentFragment();

  const artists = response['artists']['artist'];

  artists.forEach(function (artist) {
    addArtistImage(artist, elements, 'element').addEventListener('click', function (event) {
      artistHandler.loadArtistOnMainPage(event.currentTarget.title);
    });
  });

  let pageAttr = response['artists']['@attr'];
  addPagingScroll(pageAttr, elements);
  resultBox.appendChild(elements);
}

export function addHead(head) {
  document.querySelector('.head').innerHTML = head;
}

function loadTopArtistsOnPage(number = 1) {
  if (typeof (number) === 'object') {
    number = 1;
  }

  clearLikeBox();
  addHead('Top artists:');
  addSpinner();

  let loader = new ArtistList();
  let response = loader.load(number);

  response
    .then(res => {
      const responseObj = JSON.parse(res.responseText);
      handleResponseOfTopArtists(responseObj)
    });
}

export function addSpinner() {
  const resultBox = document.querySelector('.result-box');
  resultBox.innerHTML = '';
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  resultBox.appendChild(spinner);
}

export function addLikes(likes) {
  const likeBox = document.querySelector('.stars');
  likeBox.style.display = 'block';
  likeBox.innerHTML = likes + ' likes';
}

export function clearLikeBox() {
  const likeBox = document.querySelector('.stars');
  likeBox.style.display = 'none';
  likeBox.innerHTML = '';
}

export function cleanContentForArtist() {
  const scroll = document.querySelector('.result-scroll');
  const current = document.querySelector('.result-scroll .current');
  if (scroll !== null) {
    scroll.innerHTML = '';
    current.innerHTML = 'Back to list';
    current.className = 'back-to-result';
    scroll.appendChild(current);
  }
}

let label = document.getElementById('label');
label.addEventListener('click', loadTopArtistsOnPage);

window.onload = loadTopArtistsOnPage;
