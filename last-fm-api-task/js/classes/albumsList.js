'use strict';
import Loader from './loader';

export default function AlbumsList() {
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

Loader.prototype.inherits(AlbumsList);