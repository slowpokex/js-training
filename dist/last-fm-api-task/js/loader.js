'use strict';

function Loader(user, password) {
  this.user = user;
  this.password = password;
}

Loader.prototype.load = function (queryParams) {
  return new Promise(function (accept, reject) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', queryParams, true, this.user, this.password);
    xhr.setRequestHeader("Cache-Control", 'no-cache');
    xhr.timeout = 30000;

    xhr.ontimeout = function () {
      reject(this);
    };

    xhr.send();

    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) return;
      if (this.statusCode !== 200) {
        reject(this);
        return;
      }
      accept(this);
    };
  });
};
//# sourceMappingURL=loader.js.map