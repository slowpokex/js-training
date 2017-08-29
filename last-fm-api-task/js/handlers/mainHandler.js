'use strict';
import ArtistList from '../classes/artistList';
import * as artistHandler from '../handlers/artistHandler';
import route from '../handlers/routing';

export function getResultBox() {
  return document.querySelector('.result-box');
}

export function addItemImage(item, root, clazz) {
  if (!item || !root) return;
  const image = document.createElement('img');
  image.src = item['image'][2]['#text'];
  image.title = item.name;
  image.className = clazz;

  image.onerror = function () {
    console.error('Error loading image ', this);
    this.style.display = 'none';
  };

  root.appendChild(image);
  return image;
}

function handleResponseOfTopArtists(response) {
  if (!(response instanceof Object)) return;

  const resultBox = getResultBox();
  resultBox.innerHTML = '';
  const elements = document.createDocumentFragment();

  const artists = response['artists']['artist'];
  const pageAttr = response['artists']['@attr'];
  const currentPage = pageAttr['page'];
  const totalPages = pageAttr['totalPages'];

  artists.forEach(function (artist) {
    let image = addItemImage(artist, elements, 'element');
    if (image) {
      image.onclick = function (event) {
        artistHandler.loadArtistOnMainPage(event.currentTarget.title);
        route.clearScrollBox();
        route.addRouteChild('Back to top', () => loadTopArtistsOnPage(currentPage))
      };
    }
  });

  route._generatePagingScroll(currentPage, totalPages, loadTopArtistsOnPage);
  resultBox.appendChild(elements);
}

export function addHead(head) {
  document.querySelector('.head').innerHTML = head;
}

export function loadTopArtistsOnPage(number = 1) {
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
  const resultBox = getResultBox();
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

function addLabelBehavior() {
  let label = document.getElementById('label');
  label.addEventListener('click', loadTopArtistsOnPage);
}


window.onload = loadTopArtistsOnPage;
addLabelBehavior();
