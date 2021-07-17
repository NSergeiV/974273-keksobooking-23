import {generatingPosters} from './map.js';
// import {inputAddress} from './form.js';
import {sortAds} from './filter-sort.js';
import {debounce} from './debounce.js';

const SIMILAR_AD_COUNT = 10;

const dataSetForSearch = {
  features: [],
  guests: 'any',
  price: 'any',
  rooms: 'any',
  type: 'any',
};

const mapFilter = document.querySelector('.map__filters');
const mapFilterChildren = mapFilter.querySelectorAll('.map__filter');
const housingType = mapFilter.querySelector('#housing-type');
const housingPrice = mapFilter.querySelector('#housing-price');
const housingRooms = mapFilter.querySelector('#housing-rooms');
const housingGuests = mapFilter.querySelector('#housing-guests');
const mapFeatures =mapFilter.querySelectorAll('#housing-features input');

// console.log(mapFeatures);

/*
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
*/
// Отправка массива из 10 на отрисовку в карту
const selectMarkers = (ads) => {
  const allAds = ads.slice();
  const similarAds = allAds.slice(0, SIMILAR_AD_COUNT);

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

// Изменение запроса данных фильтра

const onChangeFilter = () => {
  dataSetForSearch.type = housingType.value;
  dataSetForSearch.price = housingPrice.value;
  dataSetForSearch.rooms = housingRooms.value;
  dataSetForSearch.guests = housingGuests.value;
  dataSetForSearch.features = Array.from(mapFeatures).filter((feature) => feature.checked).map((feature) => feature.value);

  // console.log(dataSetForSearch.features);
  // console.log(Array.from(mapFeatures).filter((feature) => feature.checked));

  sortAds(dataSetForSearch);
};

mapFilter.addEventListener('change', debounce(onChangeFilter));

export {mapFilter, mapFilterChildren, unlockFilter, selectMarkers, dataSetForSearch};
