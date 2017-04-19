var lastFm =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = Loader;

function Loader() { }

//Settings for Last.FM application
Loader.prototype.API_KEY = '9a5f1f19efe1727160e4dbb5e4367b9d';
Loader.prototype.SECRET_KEY = '92348e86733362627fd83e30dba8046e';
Loader.prototype.START_URL = 'http://ws.audioscrobbler.com/2.0/?';
Loader.prototype.FORMAT = 'json';

Loader.prototype.METHOD_KEY = 'method=';
Loader.prototype.ARTIST_KEY = '&artist=';
Loader.prototype.ALBUM_KEY = '&album=';

Loader.prototype.LINE_API_KEY = '&api_key=' + Loader.prototype.API_KEY;
Loader.prototype.LINE_FORMAT = '&format=' + Loader.prototype.FORMAT;
Loader.prototype.QUERY_POSTFIX = Loader.prototype.LINE_API_KEY + Loader.prototype.LINE_FORMAT;

Loader.prototype.returnMethodQuery = function (method) {
  return Loader.prototype.METHOD_KEY + method;
};

Loader.prototype.returnArtistParameter = function (value) {
  return Loader.prototype.ARTIST_KEY + value;
};

Loader.prototype.returnAlbumParameter = function (value) {
  return Loader.prototype.ALBUM_KEY + value;
};

Loader.prototype.inherits = function (parent, child) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
};

Loader.prototype.parseToObj = function (response) {};

Loader.prototype.load = function (queryParams) {
  return new Promise(function (resolve, reject) {
    const xhr =  new XMLHttpRequest();
    xhr.open('GET', queryParams, true);
    xhr.setRequestHeader("Cache-Control", 'no-cache');

    xhr.send();

    xhr.onreadystatechange = function() {
      if (this.readyState !== 4) return;
      if (this.status !== 200) {
        reject(this);
        return;
      }
      resolve(this);
    };
  });
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loader__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["default"] = AlbumInfo;


function AlbumInfo() {
  this.load = function (artist, album) {
    const method = 'album.getinfo';
    const methodQuery = this.__proto__.returnMethodQuery(method);
    const artistQuery = this.__proto__.returnArtistParameter(artist);
    const albumQuery = this.__proto__.returnAlbumParameter(album);
    const fullQuery = this.__proto__.START_URL + methodQuery + artistQuery + albumQuery + this.QUERY_POSTFIX;
    console.log(fullQuery);
    return this.__proto__.load(fullQuery);
  }

  this.parseToObj = function (response) {
    let result = {};
    return result;
  }
}

__WEBPACK_IMPORTED_MODULE_0__loader__["default"].prototype.inherits(__WEBPACK_IMPORTED_MODULE_0__loader__["default"], AlbumInfo);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loader__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["default"] = ArtistInfo;



function ArtistInfo() {
  this.load = function (artist) {
    const method = 'artist.getinfo';
    const methodQuery = this.__proto__.returnMethodQuery(method);
    const artistQuery = this.__proto__.returnArtistParameter(artist);
    const fullQuery = this.__proto__.START_URL + methodQuery + artistQuery + this.__proto__.QUERY_POSTFIX;
    console.log(fullQuery);
    return this.__proto__.load(fullQuery);
  };

  this.parseToObj = function (response) {
    let result = {};
    return result;
  };
}

__WEBPACK_IMPORTED_MODULE_0__loader__["default"].prototype.inherits(__WEBPACK_IMPORTED_MODULE_0__loader__["default"], ArtistInfo);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loader__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["default"] = ArtistList;



function ArtistList() {
  const method = 'chart.gettopartists';
  const fullQuery = this.START_URL + this.returnMethodQuery(method) + this.QUERY_POSTFIX;

  this.load = function () {
    console.log(fullQuery);
    return this.__proto__.load(fullQuery);
  }

  this.parseToObj = function (response) {
    let result = {};
    let draft = JSON.parse(response);
    return result;
  }
}

__WEBPACK_IMPORTED_MODULE_0__loader__["default"].prototype.inherits(__WEBPACK_IMPORTED_MODULE_0__loader__["default"], ArtistList);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loader__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["default"] = ArtistSearch;



function ArtistSearch() {
  this.load = function (artist) {
    const method = 'artist.search';
    const methodQuery = this.__proto__.returnMethodQuery(method);
    const artistQuery = this.__proto__.returnArtistParameter(artist);
    const fullQuery = this.__proto__.START_URL + methodQuery + artistQuery + this.__proto__.QUERY_POSTFIX;
    console.log(fullQuery);
    return this.__proto__.load(fullQuery);
  }

  this.parseToObj = function (response) {
    let result = {};
    return result;
  }
}

__WEBPACK_IMPORTED_MODULE_0__loader__["default"].prototype.inherits(__WEBPACK_IMPORTED_MODULE_0__loader__["default"], ArtistSearch);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_loader__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_artistList__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_artistInfo__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classes_albumInfo__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__classes_searchArtist__ = __webpack_require__(4);







function searchResult() {
  const type = document.querySelector('select[name="category"]');
  const artist = document.querySelector('input[name="artist"]');
  const album = document.querySelector('input[name="album"]');
  let response;
  let loader;

  switch (type.value) {
    case 'artist-list' : {
      loader = new __WEBPACK_IMPORTED_MODULE_1__classes_artistList__["default"]();
      response = loader.load();
    } break;
    case 'search-artist' : {
      loader = new __WEBPACK_IMPORTED_MODULE_4__classes_searchArtist__["default"]();
      response = loader.load(artist.value);
    } break;
    case 'search-artist-info' : {
      loader = new __WEBPACK_IMPORTED_MODULE_2__classes_artistInfo__["default"]();
      response = loader.load(artist.value);
    } break;
    case 'search-album' : {
      loader = new __WEBPACK_IMPORTED_MODULE_3__classes_albumInfo__["default"]();
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
  //let result = JSON.parse(response.responseText);
  if (!type instanceof __WEBPACK_IMPORTED_MODULE_0__classes_loader__["default"]) return;
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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
__webpack_require__(5);
__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);
module.exports = __webpack_require__(4);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map