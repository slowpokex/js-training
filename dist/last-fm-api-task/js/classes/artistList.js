'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ArtistList;

var _loader = require('./loader');

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ArtistList() {
  var method = 'chart.gettopartists';
  var fullQuery = this.START_URL + this.returnMethodQuery(method) + this.QUERY_POSTFIX;

  this.load = function () {
    console.log(fullQuery);
    return this.__proto__.load(fullQuery);
  };

  this.parseToObj = function (response) {
    var result = {};
    var draft = JSON.parse(response);
    return result;
  };
}

_loader2.default.prototype.inherits(_loader2.default, ArtistList);
//# sourceMappingURL=artistList.js.map