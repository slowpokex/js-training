'use strict';
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

Loader.prototype.inherits(Loader, ArtistSearch);
