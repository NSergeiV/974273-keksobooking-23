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

const generatingPosters = (ad) => {
  for (let i = 0; i < 1; i++) {
    const conveniences = ad.offer.features;
    const modifiers = conveniences.map((feature) => `popup__feature--${feature}`);
    const newElement = template.cloneNode(true);
    newElement.querySelector('.popup__avatar').src = ad.author.avatar;
    newElement.querySelector('.popup__title').textContent = ad.offer.title;
    newElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    newElement.querySelector('.popup__text--price').textContent = ' ';
    newElement.querySelector('.popup__text--price').insertAdjacentHTML('afterbegin', `${ad.offer.price} <span>₽/ночь</span>`);
    newElement.querySelector('.popup__type').textContent = `${gettingTypeHousing(ad.offer.type)}`;
    newElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
    newElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}}`;
    newElement.querySelector('.popup__features').querySelectorAll('.popup__feature').forEach((item) => {
      const classItem = item.classList[1];
      if (!modifiers.includes(classItem)) {
        item.remove();
      }
    });
    if (!ad.offer.description) {
      newElement.querySelector('.popup__description').remove();
    } else {
      newElement.querySelector('.popup__description').textContent = ad.offer.description;
    }
    const blockPhotos = newElement.querySelector('.popup__photos');
    blockPhotos.querySelector('img').remove();
    for (let j = 0; j < ad.offer.photos.length; j++) {
      blockPhotos.insertAdjacentHTML('beforeend', `<img src="${ad.offer.photos[j]}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
    }

    fragment.appendChild(newElement);
  }
  mapCanvas.appendChild(fragment);
};

export {generatingPosters};
