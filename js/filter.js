import {generatingPosters, markerGroup} from './map.js';
import {inputAddress} from './form.js';
import {sortAds} from './filter-sort.js';
import {debounce} from './debounce.js';

const SIMILAR_AD_COUNT = 10;
// const RERENDER_DELAY = 2000;

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
const mapFeatures = mapFilter.querySelector('#housing-features');


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
  markerGroup.clearLayers();
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

const onChange = (evt) => {
  const typeHousing = evt.target.value;
  dataSetForSearch.type = typeHousing;
  sortAds(dataSetForSearch);
};

housingType.addEventListener('change', debounce(onChange));

housingPrice.addEventListener('change', (evt) => {
  const price = evt.target.value;
  dataSetForSearch.price = price;
  sortAds(dataSetForSearch);
});

housingRooms.addEventListener('change', (evt) => {
  const rooms = evt.target.value;
  dataSetForSearch.rooms = rooms;
  sortAds(dataSetForSearch);
});

housingGuests.addEventListener('change', (evt) => {
  const guests = evt.target.value;
  dataSetForSearch.guests = guests;
  sortAds(dataSetForSearch);
});

mapFeatures.addEventListener('change', (evt) => {

  if (dataSetForSearch.features.includes(evt.target.value)) {
    const indexFeatures = dataSetForSearch.features.indexOf(evt.target.value);

    dataSetForSearch.features.splice(indexFeatures, 1);
    sortAds(dataSetForSearch);
  } else {

    dataSetForSearch.features.push(evt.target.value);
    sortAds(dataSetForSearch);
  }
});

export {mapFilter, mapFilterChildren, unlockFilter, selectMarkers, dataSetForSearch};
