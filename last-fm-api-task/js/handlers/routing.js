'use strict';
export default class Route {
  static showPagingScroll() {
    const pageNumbers = document.querySelector('.result-scroll');
    if (pageNumbers !== null && pageNumbers.style.display !== 'block') {
      pageNumbers.style.display = 'block';
    }
  }

  static generateRangeForPagination(currPage, maxPages) {
    let arr = [];

    currPage = Number.parseInt(currPage);
    maxPages = Number.parseInt(maxPages);

    const vault = 3;
    let start, end;
    if (currPage < vault + 1) {
      start = 1;
      end = (2 * vault) + 1;
    } else if (currPage > maxPages - vault) {
      start = maxPages - ((2 * vault) + 1);
      end = maxPages;
    } else {
      start = currPage - vault;
      end = currPage + vault;
    }

    for (let i = start; i <= end; i++) {
      arr.push(i);
    }

    return arr;
  }

  static _generatePagingScroll(currentPage, totalPages, funcToUse) {
    function addNumberOfScrollElement(elem, fragment) {
      let div = document.createElement('div');
      div.innerHTML = elem;
      div.onclick = function () {
        funcToUse(elem);
      };
      if (currentPage == elem) {
        div.classList.add('current');
      }
      fragment.appendChild(div);
    }

    const range = Route.generateRangeForPagination(currentPage, totalPages);
    const scrollBox = Route.getScrollBox();
    Route.clearScrollBox();
    Route._downSelectorWeight();

    const fragment = document.createDocumentFragment();

    range.forEach(function (elem) {
      addNumberOfScrollElement(elem, fragment)
    });

    scrollBox.appendChild(fragment);
  }

  static addRouteChild(text, behavior) {
    const scroll = Route.getScrollBox();
    Route._upSelectorWeight();
    const scrollChild = document.createElement('div');
    scrollChild.className = 'back-child';
    scrollChild.innerHTML = text;
    scrollChild.onclick = behavior;
    scroll.appendChild(scrollChild);
    return scrollChild;
  }

  static _upSelectorWeight() {
    Route.getScrollBox().id = 'scrollWithWeight';
  }

  static _downSelectorWeight() {
    Route.getScrollBox().id = '';
  }

  static deleteLastRouteChild() {
    const scroll = Route.getScrollBox();
    scroll.removeChild(scroll.lastChild);
  }

  static clearScrollBox() {
    const box = Route.getScrollBox();
    if (box) box.innerHTML = '';
  }

  static getScrollBox() {
    return document.querySelector('.result-scroll');
  }
}
