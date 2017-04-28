'use strict';
import * as mainHandler from '../handlers/mainHandler';
import ArtistInfo from '../classes/artistInfo';
import AlbumsList from '../classes/albumsList';

function addInfo(artist, resultBox) {
  let bio = artist['bio']['content'];
  let text = document.createElement('div');
  text.classList.add('info-box');
  text.innerHTML = bio;
  resultBox.appendChild(text);
}

function addAlbumsOnArtistPage(response, resultBox) {

  function addHeadOfAlbums(fragment) {
    let albumHead = document.createElement('span');
    albumHead.classList.add('head');
    albumHead.innerHTML = 'Top albums:<br/>';
    fragment.appendChild(albumHead);
  }

  function addAlbumInPage(album, fragment) {
    let name = album['name'];
    let imageSrc = album['image'][2]['#text'];
    let img = document.createElement('img');
    img.classList.add('element');
    img.src = imageSrc;
    img.title = name;

    if (img.title === '(null)') return;
    
    fragment.appendChild(img);
    return img;
  }

  let fragment  = document.createDocumentFragment();
  addHeadOfAlbums(fragment);
  const albums = response['topalbums']['album'];

  albums.forEach(function (album) {
    addAlbumInPage(album, fragment);
  });

  resultBox.appendChild(fragment);
}

function addAlbums(artist, resultBox) {
  const artistName = artist['name'];
  let albumInfo = new AlbumsList();
  const result = albumInfo.load(artistName);
  result.then(res => {
    const responseObj = JSON.parse(res.responseText);
    addAlbumsOnArtistPage(responseObj, resultBox);
  });
}

function addArtistToMainPage(response) {
  const resultBox = document.querySelector('.result-box');
  resultBox.innerHTML = '';

  const artistBox = document.createElement('div');
  artistBox.className = 'artist-box';
  resultBox.appendChild(artistBox);
  const artist = response['artist'];

  mainHandler.addArtistImage(artist, artistBox, 'artist');
  mainHandler.addLikes(artist["stats"]["listeners"]);
  addInfo(artist, artistBox);
  addAlbums(artist, resultBox);
}

export function loadArtistOnMainPage(name) {
  mainHandler.addHead(name);
  mainHandler.addSpinner();
  mainHandler.cleanContentForArtist();
  const artist = new ArtistInfo();
  const result = artist.load(name);

  result.then(res => {
    const responseObj = JSON.parse(res.responseText);
    addArtistToMainPage(responseObj)
  });
}