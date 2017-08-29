'use strict';
import * as mainHandler from '../handlers/mainHandler';
import ArtistInfo from '../classes/artistInfo';
import AlbumsList from '../classes/albumsList';
import * as albumHandler from '../handlers/albumHandler';
import route from '../handlers/routing';

function addInfo(artist, resultBox) {
  const bio = artist['bio']['content'];
  const text = document.createElement('div');
  text.classList.add('info-box');
  text.innerHTML = bio;
  resultBox.appendChild(text);
}

function addAlbumsOnPage(response, resultBox) {

  function addHeadOfAlbums(fragment) {
    const albumHead = document.createElement('span');
    if (!fragment) return;
    albumHead.className = 'head';
    albumHead.innerHTML = 'Top albums:';
    fragment.appendChild(albumHead);
  }

  function addAlbumInPage(album, fragment) {
    if (!album || !fragment) return;

    const name = album['name'];
    const imageSrc = album['image'][2]['#text'];
    const img = document.createElement('img');

    img.className = 'element';
    img.src = imageSrc;
    img.title = name;

    img.onerror = function () {
      console.error('Error loading image ', this);
      this.style.display = 'none';
    };
    
    fragment.appendChild(img);
    return img;
  }

  const fragment  = document.createDocumentFragment();
  addHeadOfAlbums(fragment);
  const albums = response['topalbums']['album'];

  if (!albums) return;

  albums.forEach(function (album) {
    const albumImage = addAlbumInPage(album, fragment);

    albumImage.onclick = function () {
      const artistName = album['artist']['name'];
      const albumName = album['name'];
      albumHandler.loadAlbumOnMainPage(albumName, artistName);
      route.addRouteChild('Back to artist', () => {
        loadArtistOnMainPage(artistName);
        route.deleteLastRouteChild()});
    };
  });

  resultBox.appendChild(fragment);
}

function addAlbums(artist, resultBox) {
  if (!artist || !resultBox) return;

  const artistName = artist['name'];
  const albumInfo = new AlbumsList();
  const result = albumInfo.load(artistName);

  result.then(res => {
    const responseObj = JSON.parse(res.responseText);
    addAlbumsOnPage(responseObj, resultBox);
  });
}

function addArtistToMainPage(response) {
  if (!response) return;
  const resultBox = mainHandler.getResultBox();
  resultBox.innerHTML = '';

  const artistBox = document.createElement('div');
  artistBox.className = 'artist-box';
  resultBox.appendChild(artistBox);

  const artist = response['artist'];

  mainHandler.addItemImage(artist, artistBox, 'artist');
  mainHandler.addLikes(artist["stats"]["listeners"]);
  addInfo(artist, artistBox);
  addAlbums(artist, resultBox);
}

export function loadArtistOnMainPage(name) {
  mainHandler.addHead(name);
  mainHandler.addSpinner();
  const artist = new ArtistInfo();
  const result = artist.load(name);

  result.then(res => {
    const responseObj = JSON.parse(res.responseText);
    addArtistToMainPage(responseObj)
  });
}