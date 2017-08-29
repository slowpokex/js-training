'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AlbumInfo;

var _loader = require('./loader');

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

_loader2.default.prototype.inherits(_loader2.default, AlbumInfo);
//# sourceMappingURL=albumInfo.js.map