import {generatingPosters} from './map.js';
import {inputAddress} from './form.js';

const SIMILAR_AD_COUNT = 10;

const mapFilter = document.querySelector('.map__filters');
const mapFilterChildren = mapFilter.querySelectorAll('.map__filter');
// const housingType = mapFilter.querySelector('#housing-type');

// Сортируем по удаленности
const sortByDistance = (set) => {
  const mainMarkerAdres = inputAddress.value;
  const coordinates = mainMarkerAdres.split(', ');
  set.sort((a, b) => {
    const differenceOne = Math.sqrt(Math.pow((Number(coordinates[0]) - a.location.lat), 2) + Math.pow((Number(coordinates[1]) - a.location.lng), 2));
    const differenceTwo = Math.sqrt(Math.pow((Number(coordinates[0]) - b.location.lat), 2) + Math.pow((Number(coordinates[1]) - b.location.lng), 2));
    const rangeDiff = differenceOne - differenceTwo;
    return rangeDiff;
  });
  return set;
};

const selectMarkers = (ads) => {
  const allAds = ads.slice();
  const similarAds = sortByDistance(allAds).slice(0, SIMILAR_AD_COUNT);
  // const selectedType = housingType.querySelector('option[selected]').value;
  generatingPosters(similarAds);
};

// Разблокировка интерактивных полей фильтра
const unlockFilter = (ads) => {
  selectMarkers(ads);
  mapFilter.classList.remove('ad-form--disabled');
  mapFilterChildren.forEach((item) => {
    item.removeAttribute('disabled');
  });
};

export {mapFilter, mapFilterChildren, unlockFilter, selectMarkers};
