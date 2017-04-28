var main =
webpackJsonp_name_([0],[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = Loader;

function Loader() { }

const PROTO = Loader.prototype;

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

PROTO.inherits = function (child) {
  child.prototype = Object.create(PROTO);
  child.prototype.constructor = child;
};

PROTO.load = function (queryParams) {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_artistInfo__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_albumsList__ = __webpack_require__(3);
/* harmony export (immutable) */ __webpack_exports__["loadArtistOnMainPage"] = loadArtistOnMainPage;





function addInfo(artist, resultBox) {
  let bio = artist['bio']['content'];
  let text = document.createElement('div');
  text.classList.add('info-box');
  text.innerHTML = bio;
  resultBox.appendChild(text);
}

function addAlbumsOnArtistPage(response, resultBox) {

  function addHeadOfAlbums(fragment) {
    let albumHead = document.createElement('span');
    albumHead.classList.add('head');
    albumHead.innerHTML = 'Top albums:<br/>';
    fragment.appendChild(albumHead);
  }

  function addAlbumInPage(album, fragment) {
    let name = album['name'];
    let imageSrc = album['image'][2]['#text'];
    let img = document.createElement('img');
    img.classList.add('element');
    img.src = imageSrc;
    img.title = name;

    if (img.title === '(null)') return;
    
    fragment.appendChild(img);
    return img;
  }

  let fragment  = document.createDocumentFragment();
  addHeadOfAlbums(fragment);
  const albums = response['topalbums']['album'];

  albums.forEach(function (album) {
    addAlbumInPage(album, fragment);
  });

  resultBox.appendChild(fragment);
}

function addAlbums(artist, resultBox) {
  const artistName = artist['name'];
  let albumInfo = new __WEBPACK_IMPORTED_MODULE_2__classes_albumsList__["default"]();
  const result = albumInfo.load(artistName);
  result.then(res => {
    const responseObj = JSON.parse(res.responseText);
    addAlbumsOnArtistPage(responseObj, resultBox);
  });
}

function addArtistToMainPage(response) {
  const resultBox = document.querySelector('.result-box');
  resultBox.innerHTML = '';

  const artistBox = document.createElement('div');
  artistBox.className = 'artist-box';
  resultBox.appendChild(artistBox);
  const artist = response['artist'];

  __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__["addArtistImage"](artist, artistBox, 'artist');
  __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__["addLikes"](artist["stats"]["listeners"]);
  addInfo(artist, artistBox);
  addAlbums(artist, resultBox);
}

function loadArtistOnMainPage(name) {
  __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__["addHead"](name);
  __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__["addSpinner"]();
  __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__["cleanContentForArtist"]();
  const artist = new __WEBPACK_IMPORTED_MODULE_1__classes_artistInfo__["default"]();
  const result = artist.load(name);

  result.then(res => {
    const responseObj = JSON.parse(res.responseText);
    addArtistToMainPage(responseObj)
  });
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_artistList__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__handlers_artistHandler__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["clearPagingScroll"] = clearPagingScroll;
/* harmony export (immutable) */ __webpack_exports__["showPagingScroll"] = showPagingScroll;
/* harmony export (immutable) */ __webpack_exports__["addPagingScroll"] = addPagingScroll;
/* harmony export (immutable) */ __webpack_exports__["addArtistImage"] = addArtistImage;
/* harmony export (immutable) */ __webpack_exports__["addHead"] = addHead;
/* harmony export (immutable) */ __webpack_exports__["addSpinner"] = addSpinner;
/* harmony export (immutable) */ __webpack_exports__["addLikes"] = addLikes;
/* harmony export (immutable) */ __webpack_exports__["clearLikeBox"] = clearLikeBox;
/* harmony export (immutable) */ __webpack_exports__["cleanContentForArtist"] = cleanContentForArtist;




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

function clearPagingScroll() {
  const pageNumbers = document.querySelector('.result-scroll');
  if (pageNumbers !== null) {
    pageNumbers.style.display = 'none';
  }
}

function showPagingScroll() {
  const pageNumbers = document.querySelector('.result-scroll');
  if (pageNumbers !== null) {
    pageNumbers.style.display = 'block';
  }
}

function addPagingScroll(attr) {
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

function addArtistImage(artist, root, clazz) {
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
      __WEBPACK_IMPORTED_MODULE_1__handlers_artistHandler__["loadArtistOnMainPage"](event.currentTarget.title);
    });
  });

  let pageAttr = response['artists']['@attr'];
  addPagingScroll(pageAttr, elements);
  resultBox.appendChild(elements);
}

function addHead(head) {
  document.querySelector('.head').innerHTML = head;
}

function loadTopArtistsOnPage(number = 1) {
  if (typeof (number) === 'object') {
    number = 1;
  }

  clearLikeBox();
  addHead('Top artists:');
  addSpinner();

  let loader = new __WEBPACK_IMPORTED_MODULE_0__classes_artistList__["default"]();
  let response = loader.load(number);

  response
    .then(res => {
      const responseObj = JSON.parse(res.responseText);
      handleResponseOfTopArtists(responseObj)
    });
}

function addSpinner() {
  const resultBox = document.querySelector('.result-box');
  resultBox.innerHTML = '';
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  resultBox.appendChild(spinner);
}

function addLikes(likes) {
  const likeBox = document.querySelector('.stars');
  likeBox.style.display = 'block';
  likeBox.innerHTML = likes + ' likes';
}

function clearLikeBox() {
  const likeBox = document.querySelector('.stars');
  likeBox.style.display = 'none';
  likeBox.innerHTML = '';
}

function cleanContentForArtist() {
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


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loader__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["default"] = AlbumsList;



function AlbumsList() {
  const method = 'artist.getTopAlbums';

  this.load = function (artist) {
    const methodQuery = this.__proto__.returnMethodQuery(method);
    const artistQuery = this.__proto__.returnArtistParameter(artist);
    const fullQuery = this.__proto__.START_URL + methodQuery + artistQuery +
      this.__proto__.generateLimit(20) + this.__proto__.QUERY_POSTFIX;
    console.log(fullQuery);
    return this.__proto__.load(fullQuery);
  };
}

__WEBPACK_IMPORTED_MODULE_0__loader__["default"].prototype.inherits(AlbumsList);

/***/ }),
/* 4 */
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
}

__WEBPACK_IMPORTED_MODULE_0__loader__["default"].prototype.inherits(ArtistInfo);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loader__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["default"] = ArtistList;



function ArtistList() {
  const method = 'chart.gettopartists';

  this.load = function (page) {
    const fullQuery = this.START_URL + this.returnMethodQuery(method) +
      this.generatePage(page) + this.generateLimit(50) + this.QUERY_POSTFIX;
    console.log(fullQuery);
    return this.__proto__.load(fullQuery);
  };
}

__WEBPACK_IMPORTED_MODULE_0__loader__["default"].prototype.inherits(ArtistList);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loader__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["default"] = ArtistSearch;



function ArtistSearch() {
  this.load = function (artist, page) {
    page = page || 1;
    const method = 'artist.search';
    const methodQuery = this.__proto__.returnMethodQuery(method);
    const artistQuery = this.__proto__.returnArtistParameter(artist);
    const fullQuery = this.__proto__.START_URL + methodQuery + artistQuery +
      this.__proto__.generatePage(page) + this.__proto__.QUERY_POSTFIX;
    console.log(fullQuery);
    return this.__proto__.load(fullQuery);
  };
}

__WEBPACK_IMPORTED_MODULE_0__loader__["default"].prototype.inherits(ArtistSearch);


/***/ }),
/* 7 */
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
}

__WEBPACK_IMPORTED_MODULE_0__loader__["default"].prototype.inherits(AlbumInfo);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__handlers_artistHandler__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_searchArtist__ = __webpack_require__(6);





function handleResponseOfSearchArtists(response) {
  if (!(response instanceof Object)) return;

  const resultBox = document.querySelector('.result-box');
  const fragment = document.createDocumentFragment();
  resultBox.innerHTML = '';
  const artists = response["results"]["artistmatches"]["artist"];

  artists.forEach(function (artist) {
    __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__["addArtistImage"](artist, fragment, 'element').addEventListener('click', function (event) {
      __WEBPACK_IMPORTED_MODULE_1__handlers_artistHandler__["loadArtistOnMainPage"](event.currentTarget.title);
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

  const loader = new __WEBPACK_IMPORTED_MODULE_2__classes_searchArtist__["default"]();
  const response = loader.load(value, page);

  __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__["clearPagingScroll"]();
  __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__["clearLikeBox"]();
  __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__["addHead"]('Result of search: ' + value);
  __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__["addSpinner"]();

  response
    .then(res =>{
      const responseObj = JSON.parse(res.responseText);
      handleResponseOfSearchArtists(responseObj);
    });
}

let searchButton = document.getElementById('startSearch');
searchButton.addEventListener('click', searchArtist);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(8);
__webpack_require__(7);
__webpack_require__(4);
__webpack_require__(5);
__webpack_require__(6);
module.exports = __webpack_require__(3);


/***/ })
],[9]);
//# sourceMappingURL=bundle.js.map