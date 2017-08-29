'use strict';
import * as mainHandler from '../handlers/mainHandler';
import * as artistHandler from '../handlers/artistHandler';
import ArtistSearch from '../classes/searchArtist';
import route from '../handlers/routing';

function handleResponseOfSearchArtists(response) {
  if (!(response instanceof Object)) return;

  const resultBox = document.querySelector('.result-box');
  const fragment = document.createDocumentFragment();
  resultBox.innerHTML = '';

  const artists = response["results"]["artistmatches"]["artist"];
  if (!artists) return;

  artists.forEach(function (artist) {
    const image = mainHandler.addItemImage(artist, fragment, 'element');
    image.onclick = function (event) {
      const artistName = artist['name'];
      artistHandler.loadArtistOnMainPage(event.currentTarget.title);
      route.addRouteChild('Back to search', () => {
        getQueryLine().value = artistName;
        searchArtist();
        route.deleteLastRouteChild();
      });
    };
  });

  resultBox.appendChild(fragment);
}

function searchArtist(page) {
  if (typeof (page) === 'object') {
    page = 1;
  }
  page = page || 1;

  const querySearch = getQueryLine();
  const value = querySearch.value;


  if ( !querySearch || (value === '')) return;

  const loader = new ArtistSearch();
  const response = loader.load(value, page);

  route.clearScrollBox();
  route.addRouteChild('Back to top', mainHandler.loadTopArtistsOnPage);

  mainHandler.clearLikeBox();
  mainHandler.addHead('Result of search: ' + value);
  mainHandler.addSpinner();

  response
    .then(res =>{
      const responseObj = JSON.parse(res.responseText);
      handleResponseOfSearchArtists(responseObj);
    });

  querySearch.value = '';
}

function getQueryLine() {
  return document.querySelector(".search-box input[type='text']");
}

let searchButton = document.getElementById('startSearch');
searchButton.addEventListener('click', searchArtist);