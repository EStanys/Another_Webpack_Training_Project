// js
import greet from './js/greet';

// css
import './css/main.css';

// paveikslelis

import jpgImg from './img/M.jpg';
import pngImg from './img/U.png';

function addImageTo(importedImg) {
  const imgEl = document.createElement('img');
  imgEl.src = importedImg;
  document.body.append(imgEl);
}

addImageTo(jpgImg);
addImageTo(pngImg);

greet('ist a monday today');
