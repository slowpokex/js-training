'use strict';
import * as mainHandler from '../handlers/mainHandler';
import * as artistHandler from '../handlers/artistHandler';
import ArtistSearch from '../classes/searchArtist';

function handleResponseOfSearchArtists(response) {
  if (!(response instanceof Object)) return;

  const resultBox = document.querySelector('.result-box');
  const fragment = document.createDocumentFragment();
  resultBox.innerHTML = '';
  const artists = response["results"]["artistmatches"]["artist"];

  artists.forEach(function (artist) {
    mainHandler.addArtistImage(artist, fragment, 'element').addEventListener('click', function (event) {
      artistHandler.loadArtistOnMainPage(event.currentTarget.title);
    });
  });

  let {page, totalPages} = 4;

  resultBox.appendChild(fragment);
}

function searchArtist(page) {
  if (typeof (page) === 'object') {
    page = 1;
  }
  page = page || 1;
  const querySearch = document.querySelector(".search-box input[type='text']");
  const value = querySearch.value;

  if ((querySearch === null) || (value === '')) return;

  const loader = new ArtistSearch();
  const response = loader.load(value, page);

  mainHandler.clearPagingScroll();
  mainHandler.clearLikeBox();
  mainHandler.addHead('Result of search: ' + value);
  mainHandler.addSpinner();

  response
    .then(res =>{
      const responseObj = JSON.parse(res.responseText);
      handleResponseOfSearchArtists(responseObj);
    });
}

let searchButton = document.getElementById('startSearch');
searchButton.addEventListener('click', searchArtist);