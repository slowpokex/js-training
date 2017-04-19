'use strict';
import Loader from './loader';

export default function ArtistList() {
  const method = 'chart.gettopartists';
  const fullQuery = this.START_URL + this.returnMethodQuery(method) + this.QUERY_POSTFIX;

  this.load = function () {
    console.log(fullQuery);
    return this.__proto__.load(fullQuery);
  }

  this.parseToObj = function (response) {
    let result = {};
    let draft = JSON.parse(response);
    return result;
  }
}

Loader.prototype.inherits(Loader, ArtistList);