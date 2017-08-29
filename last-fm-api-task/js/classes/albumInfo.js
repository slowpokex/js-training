'use strict';
import Loader from './loader';

export default function AlbumInfo() {

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

Loader.prototype.inherits(AlbumInfo);
