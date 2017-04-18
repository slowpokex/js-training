'use strict';

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

Loader.prototype.inherits(Loader, ArtistList);
//# sourceMappingURL=artistList.js.map