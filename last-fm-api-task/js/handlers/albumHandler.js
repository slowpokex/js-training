'use strict';
import * as mainHandler from '../handlers/mainHandler';
import AlbumInfo from '../classes/albumInfo';

function getGenresFromAlbum(album) {
  if (!album) return;
  const tags = album['tags']['tag'];
  return tags.map((elem) => elem['name']).join(';');
}

function addAlbumInfoToInfobox(album, albumBox) {
  if (!album) return;
  const textBox = document.createElement('div');
  textBox.classList.add('info-box');

  //language=HTML
  textBox.innerHTML = `
    <ul class="album-info">
      <li>Artist : ${album['artist']}</li>
      <li>Year: 42(The meaning of life)</li>
      <li>Url: ${album['url']}}</li>
      <li>Genre: ${getGenresFromAlbum(album)}</li>
    </ul>`;

  albumBox.appendChild(textBox);
}

function addTracksOnPage(album, resultBox) {
  if (!album || !resultBox) return;
  function addHeadOfTracks(fragment) {
    if (!fragment) return;
    const albumHead = document.createElement('span');
    albumHead.className = 'head';
    albumHead.innerHTML = 'Tracks:';
    fragment.appendChild(albumHead);
  }

  const fragment  = document.createDocumentFragment();
  addHeadOfTracks(fragment);

  const tracks = album['tracks']['track'];

  resultBox.appendChild(fragment);
}

function addAlbumOnMainPage(response) {
  if (!response) return;
  const resultBox = mainHandler.getResultBox();
  resultBox.innerHTML = '';

  const album = response['album'];
  mainHandler.addLikes(album['listeners']);

  const albumBox = document.createElement('div');
  albumBox.className = 'artist-box';
  resultBox.appendChild(albumBox);
  mainHandler.addItemImage(album, albumBox, 'artist');
  addAlbumInfoToInfobox(album, albumBox);

  addTracksOnPage(album, resultBox);
}

export function loadAlbumOnMainPage(album, artist) {
  mainHandler.addHead(album);
  mainHandler.addSpinner();

  const albumLoader = new AlbumInfo();
  const albumInfo = albumLoader.load(artist, album);

  albumInfo.then((res) => {
    const responseObj = JSON.parse(res.responseText);
    addAlbumOnMainPage(responseObj);
  });
}