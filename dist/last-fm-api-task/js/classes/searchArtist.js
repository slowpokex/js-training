'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ArtistSearch;

var _loader = require('./loader');

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

_loader2.default.prototype.inherits(_loader2.default, ArtistSearch);
//# sourceMappingURL=searchArtist.js.map