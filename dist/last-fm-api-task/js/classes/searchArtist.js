'use strict';

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

Loader.prototype.inherits(Loader, ArtistSearch);
//# sourceMappingURL=searchArtist.js.map