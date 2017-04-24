'use strict';
export default function Loader() { }

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

PROTO.inherits = function (parent, child) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
};

PROTO.parseToObj = function (response) {};

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
