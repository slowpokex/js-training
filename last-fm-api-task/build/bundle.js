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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_artistList__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__handlers_artistHandler__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__handlers_routing__ = __webpack_require__(3);
/* harmony export (immutable) */ __webpack_exports__["getResultBox"] = getResultBox;
/* harmony export (immutable) */ __webpack_exports__["addItemImage"] = addItemImage;
/* harmony export (immutable) */ __webpack_exports__["addHead"] = addHead;
/* harmony export (immutable) */ __webpack_exports__["loadTopArtistsOnPage"] = loadTopArtistsOnPage;
/* harmony export (immutable) */ __webpack_exports__["addSpinner"] = addSpinner;
/* harmony export (immutable) */ __webpack_exports__["addLikes"] = addLikes;
/* harmony export (immutable) */ __webpack_exports__["clearLikeBox"] = clearLikeBox;





function getResultBox() {
  return document.querySelector('.result-box');
}

function addItemImage(item, root, clazz) {
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
        __WEBPACK_IMPORTED_MODULE_1__handlers_artistHandler__["loadArtistOnMainPage"](event.currentTarget.title);
        __WEBPACK_IMPORTED_MODULE_2__handlers_routing__["a" /* default */].clearScrollBox();
        __WEBPACK_IMPORTED_MODULE_2__handlers_routing__["a" /* default */].addRouteChild('Back to top', () => loadTopArtistsOnPage(currentPage))
      };
    }
  });

  __WEBPACK_IMPORTED_MODULE_2__handlers_routing__["a" /* default */]._generatePagingScroll(currentPage, totalPages, loadTopArtistsOnPage);
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
  const resultBox = getResultBox();
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

function addLabelBehavior() {
  let label = document.getElementById('label');
  label.addEventListener('click', loadTopArtistsOnPage);
}


window.onload = loadTopArtistsOnPage;
addLabelBehavior();


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_artistInfo__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_albumsList__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__handlers_albumHandler__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__handlers_routing__ = __webpack_require__(3);
/* harmony export (immutable) */ __webpack_exports__["loadArtistOnMainPage"] = loadArtistOnMainPage;







function addInfo(artist, resultBox) {
  const bio = artist['bio']['content'];
  const text = document.createElement('div');
  text.classList.add('info-box');
  text.innerHTML = bio;
  resultBox.appendChild(text);
}

function addAlbumsOnPage(response, resultBox) {

  function addHeadOfAlbums(fragment) {
    const albumHead = document.createElement('span');
    if (!fragment) return;
    albumHead.className = 'head';
    albumHead.innerHTML = 'Top albums:';
    fragment.appendChild(albumHead);
  }

  function addAlbumInPage(album, fragment) {
    if (!album || !fragment) return;

    const name = album['name'];
    const imageSrc = album['image'][2]['#text'];
    const img = document.createElement('img');

    img.className = 'element';
    img.src = imageSrc;
    img.title = name;

    img.onerror = function () {
      console.error('Error loading image ', this);
      this.style.display = 'none';
    };
    
    fragment.appendChild(img);
    return img;
  }

  const fragment  = document.createDocumentFragment();
  addHeadOfAlbums(fragment);
  const albums = response['topalbums']['album'];

  if (!albums) return;

  albums.forEach(function (album) {
    const albumImage = addAlbumInPage(album, fragment);

    albumImage.onclick = function () {
      const artistName = album['artist']['name'];
      const albumName = album['name'];
      __WEBPACK_IMPORTED_MODULE_3__handlers_albumHandler__["a" /* loadAlbumOnMainPage */](albumName, artistName);
      __WEBPACK_IMPORTED_MODULE_4__handlers_routing__["a" /* default */].addRouteChild('Back to artist', () => {
        loadArtistOnMainPage(artistName);
        __WEBPACK_IMPORTED_MODULE_4__handlers_routing__["a" /* default */].deleteLastRouteChild()});
    };
  });

  resultBox.appendChild(fragment);
}

function addAlbums(artist, resultBox) {
  if (!artist || !resultBox) return;

  const artistName = artist['name'];
  const albumInfo = new __WEBPACK_IMPORTED_MODULE_2__classes_albumsList__["default"]();
  const result = albumInfo.load(artistName);

  result.then(res => {
    const responseObj = JSON.parse(res.responseText);
    addAlbumsOnPage(responseObj, resultBox);
  });
}

function addArtistToMainPage(response) {
  if (!response) return;
  const resultBox = __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__["getResultBox"]();
  resultBox.innerHTML = '';

  const artistBox = document.createElement('div');
  artistBox.className = 'artist-box';
  resultBox.appendChild(artistBox);

  const artist = response['artist'];

  __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__["addItemImage"](artist, artistBox, 'artist');
  __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__["addLikes"](artist["stats"]["listeners"]);
  addInfo(artist, artistBox);
  addAlbums(artist, resultBox);
}

function loadArtistOnMainPage(name) {
  __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__["addHead"](name);
  __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__["addSpinner"]();
  const artist = new __WEBPACK_IMPORTED_MODULE_1__classes_artistInfo__["default"]();
  const result = artist.load(name);

  result.then(res => {
    const responseObj = JSON.parse(res.responseText);
    addArtistToMainPage(responseObj)
  });
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Route {
  static showPagingScroll() {
    const pageNumbers = document.querySelector('.result-scroll');
    if (pageNumbers !== null && pageNumbers.style.display !== 'block') {
      pageNumbers.style.display = 'block';
    }
  }

  static generateRangeForPagination(currPage, maxPages) {
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

  static _generatePagingScroll(currentPage, totalPages, funcToUse) {
    function addNumberOfScrollElement(elem, fragment) {
      let div = document.createElement('div');
      div.innerHTML = elem;
      div.onclick = function () {
        funcToUse(elem);
      };
      if (currentPage == elem) {
        div.classList.add('current');
      }
      fragment.appendChild(div);
    }

    const range = Route.generateRangeForPagination(currentPage, totalPages);
    const scrollBox = Route.getScrollBox();
    Route.clearScrollBox();
    Route._downSelectorWeight();

    const fragment = document.createDocumentFragment();

    range.forEach(function (elem) {
      addNumberOfScrollElement(elem, fragment)
    });

    scrollBox.appendChild(fragment);
  }

  static addRouteChild(text, behavior) {
    const scroll = Route.getScrollBox();
    Route._upSelectorWeight();
    const scrollChild = document.createElement('div');
    scrollChild.className = 'back-child';
    scrollChild.innerHTML = text;
    scrollChild.onclick = behavior;
    scroll.appendChild(scrollChild);
    return scrollChild;
  }

  static _upSelectorWeight() {
    Route.getScrollBox().id = 'scrollWithWeight';
  }

  static _downSelectorWeight() {
    Route.getScrollBox().id = '';
  }

  static deleteLastRouteChild() {
    const scroll = Route.getScrollBox();
    scroll.removeChild(scroll.lastChild);
  }

  static clearScrollBox() {
    const box = Route.getScrollBox();
    if (box) box.innerHTML = '';
  }

  static getScrollBox() {
    return document.querySelector('.result-scroll');
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Route;



/***/ }),
/* 4 */
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
/* 5 */
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
/* 6 */
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
/* 7 */
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
/* 8 */
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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__handlers_artistHandler__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_searchArtist__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__handlers_routing__ = __webpack_require__(3);






function handleResponseOfSearchArtists(response) {
  if (!(response instanceof Object)) return;

  const resultBox = document.querySelector('.result-box');
  const fragment = document.createDocumentFragment();
  resultBox.innerHTML = '';

  const artists = response["results"]["artistmatches"]["artist"];
  if (!artists) return;

  artists.forEach(function (artist) {
    const image = __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__["addItemImage"](artist, fragment, 'element');
    image.onclick = function (event) {
      const artistName = artist['name'];
      __WEBPACK_IMPORTED_MODULE_1__handlers_artistHandler__["loadArtistOnMainPage"](event.currentTarget.title);
      __WEBPACK_IMPORTED_MODULE_3__handlers_routing__["a" /* default */].addRouteChild('Back to search', () => {
        getQueryLine().value = artistName;
        searchArtist();
        __WEBPACK_IMPORTED_MODULE_3__handlers_routing__["a" /* default */].deleteLastRouteChild();
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

  const loader = new __WEBPACK_IMPORTED_MODULE_2__classes_searchArtist__["default"]();
  const response = loader.load(value, page);

  __WEBPACK_IMPORTED_MODULE_3__handlers_routing__["a" /* default */].clearScrollBox();
  __WEBPACK_IMPORTED_MODULE_3__handlers_routing__["a" /* default */].addRouteChild('Back to top', __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__["loadTopArtistsOnPage"]);

  __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__["clearLikeBox"]();
  __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__["addHead"]('Result of search: ' + value);
  __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__["addSpinner"]();

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

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_albumInfo__ = __webpack_require__(4);
/* harmony export (immutable) */ __webpack_exports__["a"] = loadAlbumOnMainPage;




function getGenresFromAlbum(album) {
  if (!album) return;
  const tags = album['tags']['tag'];
  return tags.map((elem) => elem['name']).join(';');
}

function addAlbumInfoToInfobox(album, albumBox) {
  if (!album) return;
  const textBox = document.createElement('div');
  textBox.classList.add('info-box');

  //language=HTML
  textBox.innerHTML = `
    <ul class="album-info">
      <li>Artist : ${album['artist']}</li>
      <li>Year: 42(The meaning of life)</li>
      <li>Url: ${album['url']}}</li>
      <li>Genre: ${getGenresFromAlbum(album)}</li>
    </ul>`;

  albumBox.appendChild(textBox);
}

function addTracksOnPage(album, resultBox) {
  if (!album || !resultBox) return;
  function addHeadOfTracks(fragment) {
    if (!fragment) return;
    const albumHead = document.createElement('span');
    albumHead.className = 'head';
    albumHead.innerHTML = 'Tracks:';
    fragment.appendChild(albumHead);
  }

  const fragment  = document.createDocumentFragment();
  addHeadOfTracks(fragment);

  const tracks = album['tracks']['track'];

  resultBox.appendChild(fragment);
}

function addAlbumOnMainPage(response) {
  if (!response) return;
  const resultBox = __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__["getResultBox"]();
  resultBox.innerHTML = '';

  const album = response['album'];
  __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__["addLikes"](album['listeners']);

  const albumBox = document.createElement('div');
  albumBox.className = 'artist-box';
  resultBox.appendChild(albumBox);
  __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__["addItemImage"](album, albumBox, 'artist');
  addAlbumInfoToInfobox(album, albumBox);

  addTracksOnPage(album, resultBox);
}

function loadAlbumOnMainPage(album, artist) {
  __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__["addHead"](album);
  __WEBPACK_IMPORTED_MODULE_0__handlers_mainHandler__["addSpinner"]();

  const albumLoader = new __WEBPACK_IMPORTED_MODULE_1__classes_albumInfo__["default"]();
  const albumInfo = albumLoader.load(artist, album);

  albumInfo.then((res) => {
    const responseObj = JSON.parse(res.responseText);
    addAlbumOnMainPage(responseObj);
  });
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
__webpack_require__(2);
__webpack_require__(1);
__webpack_require__(9);
__webpack_require__(4);
__webpack_require__(6);
__webpack_require__(7);
__webpack_require__(8);
module.exports = __webpack_require__(5);


/***/ })
],[11]);
//# sourceMappingURL=bundle.js.map