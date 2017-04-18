'use strict'
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

Loader.prototype.parseToObj = function (response) {}

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