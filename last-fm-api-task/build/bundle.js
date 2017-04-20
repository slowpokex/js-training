var main =
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Loader;
function Loader() {}

var PROTO = Loader.prototype;
//Settings for Last.FM application
PROTO.API_KEY = '9a5f1f19efe1727160e4dbb5e4367b9d';
PROTO.SECRET_KEY = '92348e86733362627fd83e30dba8046e';
PROTO.START_URL = 'http://ws.audioscrobbler.com/2.0/?';
PROTO.FORMAT = 'json';

PROTO.METHOD_KEY = 'method=';
PROTO.ARTIST_KEY = '&artist=';
PROTO.ALBUM_KEY = '&album=';

PROTO.LINE_API_KEY = '&api_key=' + PROTO.API_KEY;
PROTO.LINE_FORMAT = '&format=' + PROTO.FORMAT;
PROTO.QUERY_POSTFIX = PROTO.LINE_API_KEY + PROTO.LINE_FORMAT;

PROTO.returnMethodQuery = function (method) {
  return Loader.prototype.METHOD_KEY + method;
};

PROTO.returnArtistParameter = function (value) {
  return Loader.prototype.ARTIST_KEY + value;
};

PROTO.returnAlbumParameter = function (value) {
  return Loader.prototype.ALBUM_KEY + value;
};

PROTO.inherits = function (parent, child) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
};

PROTO.parseToObj = function (response) {};

PROTO.load = function (queryParams) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', queryParams, true);
    xhr.setRequestHeader("Cache-Control", 'no-cache');

    xhr.send();

    xhr.onreadystatechange = function () {
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AlbumInfo;

var _loader = __webpack_require__(0);

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AlbumInfo() {
  this.load = function (artist, album) {
    var method = 'album.getinfo';
    var methodQuery = this.__proto__.returnMethodQuery(method);
    var artistQuery = this.__proto__.returnArtistParameter(artist);
    var albumQuery = this.__proto__.returnAlbumParameter(album);
    var fullQuery = this.__proto__.START_URL + methodQuery + artistQuery + albumQuery + this.QUERY_POSTFIX;
    console.log(fullQuery);
    return this.__proto__.load(fullQuery);
  };

  this.parseToObj = function (response) {
    var result = {};
    return result;
  };
}

_loader2.default.prototype.inherits(_loader2.default, AlbumInfo);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ArtistInfo;

var _loader = __webpack_require__(0);

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ArtistInfo() {
  this.load = function (artist) {
    var method = 'artist.getinfo';
    var methodQuery = this.__proto__.returnMethodQuery(method);
    var artistQuery = this.__proto__.returnArtistParameter(artist);
    var fullQuery = this.__proto__.START_URL + methodQuery + artistQuery + this.__proto__.QUERY_POSTFIX;
    console.log(fullQuery);
    return this.__proto__.load(fullQuery);
  };

  this.parseToObj = function (response) {
    var result = {};
    return result;
  };
}

_loader2.default.prototype.inherits(_loader2.default, ArtistInfo);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ArtistList;

var _loader = __webpack_require__(0);

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ArtistList() {
  var method = 'chart.gettopartists';
  var fullQuery = this.START_URL + this.returnMethodQuery(method) + this.QUERY_POSTFIX;

  this.load = function () {
    console.log(fullQuery);
    return this.__proto__.load(fullQuery);
  };

  this.parseToObj = function (response) {
    var result = {};
    var draft = JSON.parse(response);
    return result;
  };
}

_loader2.default.prototype.inherits(_loader2.default, ArtistList);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ArtistSearch;

var _loader = __webpack_require__(0);

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ArtistSearch() {
  this.load = function (artist) {
    var method = 'artist.search';
    var methodQuery = this.__proto__.returnMethodQuery(method);
    var artistQuery = this.__proto__.returnArtistParameter(artist);
    var fullQuery = this.__proto__.START_URL + methodQuery + artistQuery + this.__proto__.QUERY_POSTFIX;
    console.log(fullQuery);
    return this.__proto__.load(fullQuery);
  };

  this.parseToObj = function (response) {
    var result = {};
    return result;
  };
}

_loader2.default.prototype.inherits(_loader2.default, ArtistSearch);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _loader = __webpack_require__(0);

var _loader2 = _interopRequireDefault(_loader);

var _artistList = __webpack_require__(3);

var _artistList2 = _interopRequireDefault(_artistList);

var _artistInfo = __webpack_require__(2);

var _artistInfo2 = _interopRequireDefault(_artistInfo);

var _albumInfo = __webpack_require__(1);

var _albumInfo2 = _interopRequireDefault(_albumInfo);

var _searchArtist = __webpack_require__(4);

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

function parseResponse(response, type) {
  if (!type instanceof _loader2.default) return;
  alert(response.responseText);
}

var search = document.getElementById('startSearch');
search.addEventListener('click', searchResult);

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