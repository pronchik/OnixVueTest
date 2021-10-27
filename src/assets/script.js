/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-return-assign */
function openMenu () {
  const aside = document.querySelector('aside').classList.toggle('active');

  const span = document.querySelector('.project-logo a span')
    .classList.toggle('active');

  const pLogo = document.getElementById('project-logo');
  pLogo.classList.toggle('active');

  const search = document.getElementById('search');
  search.classList.toggle('active');

  const userImg = document.querySelector('.introduction')
    .classList.toggle('active');

  const name = document.querySelector('.name-position p')
    .classList.toggle('active');

  const position = document.querySelector('.name-position span')
    .classList.toggle('active');

  const circle = document.querySelector('.introduction .circle')
    .classList.toggle('active');

  const statis = document.querySelector('.statistic')
    .classList.toggle('active');

  const menu = document.querySelector('.menu')
    .classList.toggle('active');

  const img = document.querySelectorAll('.img-menu img');
  img[0].classList.toggle('active');
  img[1].classList.toggle('active');
  img[2].classList.toggle('active');

  const spanMenu = document.getElementsByTagName('span')[7];
  spanMenu.classList.toggle('active');

  const ul = document.getElementsByTagName('ul')[0];
  ul.classList.toggle('active');

  const asd = document.getElementsByClassName('asd')[0];
  asd.classList.toggle('active');
}

function selectContent () {
  const markers = document.querySelectorAll('.marker span');
  const tabs = document.querySelectorAll('.content>div');
  document.querySelectorAll('.navigation a').forEach((link, index) => {
    link.onclick = () => {
      markers.forEach(marker => marker.style.display = 'none');
      tabs.forEach(tab => tab.classList.remove('active1'));
      markers[index].style.display = 'block';
      Array.from(tabs).find(tab => tab.classList.contains(link.innerHTML
        .toLowerCase())).classList.add('active1');
    };
  });
}

function selectContentSelector () {
  const tabs = document.querySelectorAll('.content>div');
  const sel = document.getElementById('select').selectedIndex;
  const options = document.getElementById('select').options;

  tabs.forEach(tab => tab.classList.remove('active1'));
  Array.from(tabs).find(tab => tab.classList.contains(options[sel].value
    .toLowerCase())).classList.add('active1');
}

/*
function selectActivity () {
  const markerActivity = document.querySelectorAll('.marker span.third-marker');
  const tab = document.querySelectorAll('.content .activity');

  tab[0].classList.add('active1');
  markerActivity[0].style.display = 'block';
}
*/

function modal () {
  const modal = document.getElementsByClassName('modal')[0];

  const btnNo = document.getElementsByClassName('no')[0];
  const btnNYes = document.getElementsByClassName('yes')[0];

  const numberCompleted = document.getElementsByTagName('p')[1];

  const numberOpen = document.getElementsByTagName('p')[2];

  modal.style.display = 'block';

  btnNo.onclick = function () {
    modal.style.display = 'none';
  };

  btnNYes.onclick = function () {
    if (+numberOpen.innerText <= 0) {
      alert('Error');
      modal.style.display = 'none';
    } else {
      numberCompleted.innerText = +numberCompleted.innerText + 1;
      numberOpen.innerText = +numberOpen.innerText - 1;
      modal.style.display = 'none';
    }
  };
}

function img () {
  const pictures = document.querySelectorAll('.pictures img');
  const log = document.querySelectorAll('.notifications span')[0];

  pictures.forEach((picture, index) => {
    picture.onclick = () => {
      log.innerText = String(index);
    };
  });
}

window.onload = () => {
  img();
  selectContent();
  // selectActivity();
};
