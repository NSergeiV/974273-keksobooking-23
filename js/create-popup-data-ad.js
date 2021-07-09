const templateBalloon = document.querySelector('#card').content.querySelector('.popup');

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
  const copyBalloonPopup = templateBalloon.cloneNode(true);

  copyBalloonPopup.querySelector('.popup__avatar').src = point.author.avatar;
  copyBalloonPopup.querySelector('.popup__title').textContent = point.offer.title;
  copyBalloonPopup.querySelector('.popup__text--address').textContent = point.offer.address;
  copyBalloonPopup.querySelector('.popup__text--price').textContent = ' ';
  copyBalloonPopup.querySelector('.popup__text--price').insertAdjacentHTML('afterbegin', `${point.offer.price} <span>₽/ночь</span>`);
  copyBalloonPopup.querySelector('.popup__type').textContent = `${receiveTypeHousing(point.offer.type)}`;
  copyBalloonPopup.querySelector('.popup__text--capacity').textContent = `${point.offer.rooms} комнаты для ${point.offer.guests} гостей`;
  copyBalloonPopup.querySelector('.popup__text--time').textContent = `Заезд после ${point.offer.checkin}, выезд до ${point.offer.checkout}}`;
  if (!point.offer.features) {
    copyBalloonPopup.querySelector('.popup__features').classList.add('popup__features');
  } else {
    const conveniences = point.offer.features;
    const modifiers = conveniences.map((feature) => `popup__feature--${feature}`);
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
  if (!point.offer.photos) {
    blockPhotos.classList.add('popup__features');
  } else {
    blockPhotos.querySelector('img').remove();
    for (let j = 0; j < point.offer.photos.length; j++) {
      blockPhotos.insertAdjacentHTML('beforeend', `<img src="${point.offer.photos[j]}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
    }
  }

  return copyBalloonPopup;
};

export {createCustomPopup};
