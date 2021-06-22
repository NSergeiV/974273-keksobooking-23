import {fillingObject} from './data.js';

const SIMILAR_DATA = 10;

const objects = new Array(SIMILAR_DATA).fill(null).map(() => fillingObject());

export {objects};

/* console.log(objects);

// export {objects};

//import {objects} from './main.js';
//console.log(objects);

const fragment = document.createDocumentFragment();
const template = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');
const gettingTypeHousing = (type) => {
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
const collectionAds = objects;

collectionAds.forEach((ad) => {
  console.log(ad);
  console.log(ad.offer.features);
  const conveniences = ad.offer.features;
  console.log(conveniences);
  const modifiers = conveniences.map((feature) => `popup__feature--${feature}`);
  let newElement = template.cloneNode(true);
  newElement.querySelector('.popup__avatar').src = ad.author.avatar;
  newElement.querySelector('.popup__title').textContent = ad.offer.title;
  newElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  newElement.querySelector('.popup__text--price').querySelector('span').insertAdjacentHTML('beforebegin', `${ad.offer.price} `);
  newElement.querySelector('.popup__type').textContent = `${gettingTypeHousing(ad.offer.type)}`;
  newElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  newElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}}`;
  newElement.querySelector('.popup__features').querySelectorAll('.popup__feature').forEach((item) => {
    const classItem = item.classList[1];
    if (!modifiers.includes(classList)) {
      item.remove();
    }
  });
  newElement.querySelector('.popup__description').textContent = offer.description;
  const blockPhotos = newElement.querySelector('.popup__photos');
  for (let i = 0; i < offer.photos.length; i++) {
    blockPhotos.insertAdjacentElement('beforeend', `<img src="${offer.photos[i]}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
  }

  newElement.querySelector('.popup__text--address').textContent = 'ДОБАВИЛ';
  fragment.appendChild(newElement);
});

mapCanvas.appendChild(fragment);
*/
