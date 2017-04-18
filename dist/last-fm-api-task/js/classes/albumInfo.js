'use strict';

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

Loader.prototype.inherits(Loader, AlbumInfo);
//# sourceMappingURL=albumInfo.js.map