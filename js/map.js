import {enterСoordinates, unlock} from './form.js';

const LAT_TOKYO = 35.681679;
const LNG_TOKYO = 139.753867;

const templateBalloon = document.querySelector('#card').content.querySelector('.popup');

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

const receiveTypeHousing = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
    default:
      return 'Непонятно!';
  }
};

// Создание балуна (попап объявления)
const createCustomPopup = (point) => {
  const conveniences = point.offer.features;
  const modifiers = conveniences.map((feature) => `popup__feature--${feature}`);
  const copyBalloonPopup = templateBalloon.cloneNode(true);

  copyBalloonPopup.querySelector('.popup__avatar').src = point.author.avatar;
  copyBalloonPopup.querySelector('.popup__title').textContent = point.offer.title;
  copyBalloonPopup.querySelector('.popup__text--address').textContent = point.offer.address;
  copyBalloonPopup.querySelector('.popup__text--price').textContent = ' ';
  copyBalloonPopup.querySelector('.popup__text--price').insertAdjacentHTML('afterbegin', `${point.offer.price} <span>₽/ночь</span>`);
  copyBalloonPopup.querySelector('.popup__type').textContent = `${receiveTypeHousing(point.offer.type)}`;
  copyBalloonPopup.querySelector('.popup__text--capacity').textContent = `${point.offer.rooms} комнаты для ${point.offer.guests} гостей`;
  copyBalloonPopup.querySelector('.popup__text--time').textContent = `Заезд после ${point.offer.checkin}, выезд до ${point.offer.checkout}}`;
  if (conveniences.length === 0) {
    copyBalloonPopup.querySelector('.popup__features').classList.add('popup__features');
  } else {
    copyBalloonPopup.querySelector('.popup__features').querySelectorAll('.popup__feature').forEach((item) => {
      const classItem = item.classList[1];
      if (!modifiers.includes(classItem)) {
        item.remove();
      }
    });
  }

  if (!point.offer.description) {
    copyBalloonPopup.querySelector('.popup__description').classList.add('popup__features');
  } else {
    copyBalloonPopup.querySelector('.popup__description').textContent = point.offer.description;
  }

  const blockPhotos = copyBalloonPopup.querySelector('.popup__photos');
  if (point.offer.photos.length === 0) {
    blockPhotos.classList.add('popup__features');
  } else {
    blockPhotos.querySelector('img').remove();
    for (let j = 0; j < point.offer.photos.length; j++) {
      blockPhotos.insertAdjacentHTML('beforeend', `<img src="${point.offer.photos[j]}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
    }
  }

  return copyBalloonPopup;
};

// Генерация карты и маркеров на страницу
const generatingPosters = (ads) => {

  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker({
    lat: LAT_TOKYO,
    lng: LNG_TOKYO,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }).addTo(map);

  enterСoordinates(mainPinMarker._latlng.lat, mainPinMarker._latlng.lng);
  mainPinMarker.on('moveend', (evt) => {
    enterСoordinates(evt.target.getLatLng().lat, evt.target.getLatLng().lng);
  });
  ads.forEach((ad) => {
    const {lat, lng} = ad.location;
    const iconAd = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
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

export {generatingPosters};
