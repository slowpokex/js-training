'use strict';

var _loader = require('./classes/loader');

var _loader2 = _interopRequireDefault(_loader);

var _artistList = require('./classes/artistList');

var _artistList2 = _interopRequireDefault(_artistList);

var _artistInfo = require('./classes/artistInfo');

var _artistInfo2 = _interopRequireDefault(_artistInfo);

var _albumInfo = require('./classes/albumInfo');

var _albumInfo2 = _interopRequireDefault(_albumInfo);

var _searchArtist = require('./classes/searchArtist');

var _searchArtist2 = _interopRequireDefault(_searchArtist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function searchResult() {
  var type = document.querySelector('select[name="category"]');
  var artist = document.querySelector('input[name="artist"]');
  var album = document.querySelector('input[name="album"]');
  var response = void 0;
  var loader = void 0;

  switch (type.value) {
    case 'artist-list':
      {
        loader = new _artistList2.default();
        response = loader.load();
      }break;
    case 'search-artist':
      {
        loader = new _searchArtist2.default();
        response = loader.load(artist.value);
      }break;
    case 'search-artist-info':
      {
        loader = new _artistInfo2.default();
        response = loader.load(artist.value);
      }break;
    case 'search-album':
      {
        loader = new _albumInfo2.default();
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
  if (!type instanceof _loader2.default) return;
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