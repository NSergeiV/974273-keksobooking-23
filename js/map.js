import {enterСoordinates, unlock} from './form.js';
import {createCustomPopup} from './create-popup-data-ad.js';

const LAT_TOKYO = 35.681679;
const LNG_TOKYO = 139.753867;
const MAIN_PIN_SVG = 'img/main-pin.svg';
const PIN_SVG = 'img/pin.svg';
const MAIN_MARKER_SIZE_WIDTH = 52;
const MAIN_MARKER_SIZE_HEIGHT = 52;
const MARKER_SIZE_WIDTH = 40;
const MARKER_SIZE_HEIGHT = 40;

const map = L.map('map-canvas').on('load', unlock).setView({
  lat: LAT_TOKYO, // широта центра Токио
  lng: LNG_TOKYO, // долгота центра Токио
}, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: MAIN_PIN_SVG,
  iconSize: [MAIN_MARKER_SIZE_WIDTH, MAIN_MARKER_SIZE_HEIGHT],
  iconAnchor: [MAIN_MARKER_SIZE_WIDTH / 2, MAIN_MARKER_SIZE_HEIGHT],
});

const mainPinMarker = L.marker({
  lat: LAT_TOKYO,
  lng: LNG_TOKYO,
},
{
  draggable: true,
  icon: mainPinIcon,
});

mainPinMarker.addTo(map);

const addMainMarker = () => {
  mainPinMarker.setLatLng({
    lat: LAT_TOKYO,
    lng: LNG_TOKYO,
  });
  enterСoordinates(mainPinMarker._latlng.lat, mainPinMarker._latlng.lng);
};

enterСoordinates(mainPinMarker._latlng.lat, mainPinMarker._latlng.lng);
mainPinMarker.on('moveend', (evt) => {
  enterСoordinates(evt.target.getLatLng().lat, evt.target.getLatLng().lng);
});

// Генерация карты и маркеров на страницу
const generatingPosters = (ads) => {

  ads.forEach((ad) => {
    const {lat, lng} = ad.location;
    const iconAd = L.icon({
      iconUrl: PIN_SVG,
      iconSize: [MARKER_SIZE_WIDTH, MARKER_SIZE_HEIGHT],
      iconAnchor: [MARKER_SIZE_WIDTH / 2, MARKER_SIZE_HEIGHT],
    });
    const adMarker = L.marker({
      lat,
      lng,
    }, {
      iconAd,
    });
    adMarker.addTo(map).bindPopup(
      createCustomPopup(ad),
      {
        keepInView: true,
      },
    );
  });
};

export {generatingPosters, addMainMarker};
