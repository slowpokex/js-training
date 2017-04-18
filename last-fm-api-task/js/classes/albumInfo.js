'use strict';
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

Loader.prototype.inherits(Loader, AlbumInfo);
