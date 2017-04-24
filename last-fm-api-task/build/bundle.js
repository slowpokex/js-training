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
PROTO.PAGE_KEY = '&page=';
PROTO.LIMIT_KEY = '&limit=';

PROTO.LINE_API_KEY = '&api_key=' + PROTO.API_KEY;
PROTO.LINE_FORMAT = '&format=' + PROTO.FORMAT;
PROTO.QUERY_POSTFIX = PROTO.LINE_API_KEY + PROTO.LINE_FORMAT;

PROTO.generatePage = function (page) {
  return PROTO.PAGE_KEY + (page || 1);
};

PROTO.generateLimit = function (page) {
  return PROTO.LIMIT_KEY + (page || 50);
};

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
exports.default = ArtistList;

var _loader = __webpack_require__(0);

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ArtistList() {
  var method = 'chart.gettopartists';

  this.load = function (page) {
    var fullQuery = this.START_URL + this.returnMethodQuery(method) + this.generatePage(page) + this.generateLimit(50) + this.QUERY_POSTFIX;
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
/* 2 */
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
/* 3 */
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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.generateRange = generateRange;
exports.addSpinner = addSpinner;

var _loader = __webpack_require__(0);

var _loader2 = _interopRequireDefault(_loader);

var _artistList = __webpack_require__(1);

var _artistList2 = _interopRequireDefault(_artistList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateRange(currPage, maxPages) {
  var arr = [];

  currPage = Number.parseInt(currPage);
  maxPages = Number.parseInt(maxPages);

  var vault = 3;
  var start = void 0,
      end = void 0;
  if (currPage < vault + 1) {
    start = 1;
    end = 2 * vault + 1;
  } else if (currPage > maxPages - vault) {
    start = maxPages - (2 * vault + 1);
    end = maxPages;
  } else {
    start = currPage - vault;
    end = currPage + vault;
  }
  console.log(start, end);

  for (var i = start; i <= end; i++) {
    arr.push(i);
  }

  return arr;
}

function addPagingScroll(attr) {
  if (!(attr instanceof Object) && !attr['page']) return;

  var currentPage = attr['page'];
  var arr = generateRange(currentPage, attr['totalPages']);

  var pageNumbers = document.querySelector('.result-scroll');
  pageNumbers.innerHTML = '';
  var elements = document.createDocumentFragment();

  var _loop = function _loop(elem) {
    var li = document.createElement('li');
    li.innerHTML = elem;
    li.addEventListener('click', function () {
      loadTopArtistsOnPage(elem);
    });
    if (currentPage == elem) {
      li.classList.add('current');
    }
    elements.appendChild(li);
  };

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var elem = _step.value;

      _loop(elem);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  pageNumbers.appendChild(elements);
}

function addImage(artist, root) {
  var image = document.createElement('img');
  image.src = artist['image'][2]['#text'];
  image.title = artist.name;
  image.classList.add('element');
  root.appendChild(image);
  return image;
}

function parseResponseOfTopArtists(response, type) {
  if (!type instanceof _loader2.default) return;

  var resultBox = document.querySelector('.result-box');
  resultBox.innerHTML = '';
  var elements = document.createDocumentFragment();
  var resultFromResponse = JSON.parse(response.responseText);

  var artistsFromJSON = resultFromResponse['artists'];
  var length = artistsFromJSON['artist']['length'];

  for (var i = 0; i < length; i++) {
    var artist = artistsFromJSON['artist'][i];
    addImage(artist, elements).addEventListener('click', function (event) {
      alert(event.currentTarget.title);
    });
  }
  resultBox.appendChild(elements);
  var pageAttr = artistsFromJSON['@attr'];
  addPagingScroll(pageAttr, resultBox);
}

function loadTopArtistsOnPage(number) {
  if ((typeof number === 'undefined' ? 'undefined' : _typeof(number)) === 'object') {
    number = 1;
  }
  number = number || 1;
  addSpinner();
  var loader = new _artistList2.default();
  var response = loader.load(number);
  response.then(function (res) {
    return parseResponseOfTopArtists(res, loader);
  });
}

function addSpinner() {
  var resultBox = document.querySelector('.result-box');
  resultBox.innerHTML = '';
  var spinner = document.createElement('div');
  spinner.classList.add('spinner');
  resultBox.appendChild(spinner);
}

window.onload = loadTopArtistsOnPage;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
__webpack_require__(5);
__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(1);
module.exports = __webpack_require__(4);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map