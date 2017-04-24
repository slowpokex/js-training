'use strict';
import Loader from './loader';

export default function ArtistList() {
  const method = 'chart.gettopartists';

  this.load = function (page) {
    const fullQuery = this.START_URL + this.returnMethodQuery(method) +
      this.generatePage(page) + this.generateLimit(50) + this.QUERY_POSTFIX;
    console.log(fullQuery);
    return this.__proto__.load(fullQuery);
  };

  this.parseToObj = function (response) {
    let result = {};
    let draft = JSON.parse(response);
    return result;
  }
}

Loader.prototype.inherits(Loader, ArtistList);
