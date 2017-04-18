'use strict';

function searchResult() {
  var type = document.querySelector('select[name="category"]');
  var artist = document.querySelector('input[name="artist"]');
  var album = document.querySelector('input[name="album"]');
  var response = void 0;
  var loader = void 0;

  switch (type.value) {
    case 'artist-list':
      {
        loader = new ArtistList();
        response = loader.load();
      }break;
    case 'search-artist':
      {
        loader = new ArtistSearch();
        response = loader.load(artist.value);
      }break;
    case 'search-artist-info':
      {
        loader = new ArtistInfo();
        response = loader.load(artist.value);
      }break;
    case 'search-album':
      {
        loader = new AlbumInfo();
        response = loader.load(artist.value, album.value);
      }break;
  }
  response.then(function (res) {
    return parseResponse(res, loader);
  });
}

function selectCategory(event) {
  var params = document.getElementById('queryParameters');
  var artistInput = returnInput('artist');
  var albumInput = returnInput('album');

  params.innerHTML = '';

  switch (event.currentTarget.value) {
    case 'search-artist':
      {
        params.appendChild(artistInput);
      }break;
    case 'search-artist-info':
      {
        params.appendChild(artistInput);
      }break;
    case 'search-album':
      {
        params.appendChild(artistInput);
        params.appendChild(albumInput);
      }break;
  }
}

function parseResponse(response, type) {
  //let result = JSON.parse(response.responseText);
  if (!type instanceof Loader) return;
  alert(response.responseText);
}

function returnInput(nameOfField) {
  var input = document.createElement('input');
  input.type = 'text';
  input.name = nameOfField;
  input.placeholder = 'Enter the ' + nameOfField + ' value...';
  return input;
}

var search = document.getElementById('startSearch');
search.addEventListener('click', searchResult);
var type = document.querySelector('select[name="category"]');
type.addEventListener('change', selectCategory);
//# sourceMappingURL=handler.js.map