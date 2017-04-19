'use strict';
import Loader from './classes/loader';
import ArtistList from './classes/artistList';
import ArtistInfo from './classes/artistInfo';
import AlbumInfo from './classes/albumInfo';
import ArtistSearch from './classes/searchArtist';

function searchResult() {
  const type = document.querySelector('select[name="category"]');
  const artist = document.querySelector('input[name="artist"]');
  const album = document.querySelector('input[name="album"]');
  let response;
  let loader;

  switch (type.value) {
    case 'artist-list' : {
      loader = new ArtistList();
      response = loader.load();
    } break;
    case 'search-artist' : {
      loader = new ArtistSearch();
      response = loader.load(artist.value);
    } break;
    case 'search-artist-info' : {
      loader = new ArtistInfo();
      response = loader.load(artist.value);
    } break;
    case 'search-album' : {
      loader = new AlbumInfo();
      response = loader.load(artist.value, album.value);
    } break;
  }
  response
    .then(res => parseResponse(res, loader));
}

function selectCategory(event) {
  const params = document.getElementById('queryParameters');
  const artistInput = returnInput('artist');
  const albumInput = returnInput('album');

  params.innerHTML = '';

  switch (event.currentTarget.value) {
    case 'search-artist' : {
      params.appendChild(artistInput);
    } break;
    case 'search-artist-info' : {
      params.appendChild(artistInput);
    } break;
    case 'search-album' : {
      params.appendChild(artistInput);
      params.appendChild(albumInput);
    } break;
  }
}

function parseResponse(response, type) {
  if (!type instanceof Loader) return;
  alert(response.responseText)
}

function returnInput(nameOfField) {
  const input = document.createElement('input');
  input.type = 'text';
  input.name = nameOfField;
  input.placeholder='Enter the ' + nameOfField + ' value...';
  return input;
}

const search = document.getElementById('startSearch');
search.addEventListener('click', searchResult);
const type = document.querySelector('select[name="category"]');
type.addEventListener('change', selectCategory);
