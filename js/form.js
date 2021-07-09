import {sendData} from './create-fetch.js';
import {addMainMarker} from './map.js';

const MIN_HEADING = 30;
const MAX_HEADING = 100;
const MAX_PRICE = 1000000;

const mapFilter = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');

const adFormChildren = adForm.querySelectorAll('fieldset');
const mapFilterChildren = mapFilter.querySelectorAll('.map__filter');
const inputTitle = adForm.querySelector('#title');
const inputPrice = adForm.querySelector('#price');
const inputType = adForm.querySelector('#type');
const selectRoomNumber = adForm.querySelector('#room_number');
const inputCapacity = adForm.querySelector('#capacity');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const inputAddress = adForm.querySelector('#address');

const listMinPriceHousing = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const guestRooms = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

// Блокировка интерактивных полей двух фильтров
const blockIt = (block, listChildren) => {
  block.classList.add('ad-form--disabled');
  listChildren.forEach((item) => {
    item.setAttribute('disabled', '');
  });
};

blockIt(adForm, adFormChildren);
blockIt(mapFilter, mapFilterChildren);

// Разблокировка интерактивных полей двух фильтров
const unlock = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('ad-form--disabled');
  adFormChildren.forEach((item) => {
    item.removeAttribute('disabled');
  });
  mapFilterChildren.forEach((item) => {
    item.removeAttribute('disabled');
  });
};

// Валидация поля Адресс
const enterСoordinates = (lat, lng) => {
  inputAddress.value = `${Number(lat.toFixed(5))}, ${Number(lng.toFixed(5))}`;
};

// Валидация поля времени заезда и выезда
timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

// Валидация заголовка
inputTitle.addEventListener('input', () => {
  const valueLength = inputTitle.value.length;
  if (valueLength < MIN_HEADING) {
    inputTitle.setCustomValidity(`Не хватает ${MIN_HEADING - valueLength} символа`);
  } else if (valueLength > MAX_HEADING) {
    inputTitle.setCustomValidity(`Лишний ${valueLength - MAX_HEADING} символ`);
  } else {
    inputTitle.setCustomValidity('');
  }

  inputTitle.reportValidity();
});

// Валидация цены за жилье на ночь

let selectedPrice = inputType.querySelector('option[selected]').value;
let nameTypeHousing = inputType.querySelector('option[selected]').text;


let minPriceHousing = listMinPriceHousing[selectedPrice];
inputPrice.placeholder = minPriceHousing;
inputPrice.min = minPriceHousing;

inputType.addEventListener('change', () => {

  minPriceHousing = listMinPriceHousing[inputType.value];
  inputPrice.placeholder = minPriceHousing;
  inputPrice.min = minPriceHousing;
  selectedPrice = inputType.value;

  nameTypeHousing = inputType.options[inputType.selectedIndex].text;
});

inputPrice.addEventListener('input', () => {
  const valuePrice = inputPrice.value;
  if (valuePrice > MAX_PRICE) {
    inputPrice.setCustomValidity(`Значение должно быть меньше или равно ${MAX_PRICE}`);
  } else if (valuePrice < minPriceHousing) {
    inputPrice.setCustomValidity(`Миниальная цена для ${nameTypeHousing} ${minPriceHousing}`);
  } else {
    inputPrice.setCustomValidity('');
  }

  inputPrice.reportValidity();
});

// Валидация количества гостей

let numberRooms = selectRoomNumber.querySelector('option[selected]').value;
let numberGuests = inputCapacity.querySelector('option[selected]').value;

const checkGuests = (rooms, guests) => {
  if (!guestRooms[rooms].includes(guests)) {
    inputCapacity.setCustomValidity('Это количество гостей не для этого жилья.');
  } else {
    inputCapacity.setCustomValidity('');
  }
  inputCapacity.reportValidity();
};

selectRoomNumber.addEventListener('change', () => {
  numberRooms = selectRoomNumber.value;
  checkGuests(numberRooms, numberGuests);
});

inputCapacity.addEventListener('change', () => {
  numberGuests = inputCapacity.value;
  checkGuests(numberRooms, numberGuests);
});

// Отправка данных, нажатие кнопки
const adDataSetSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(new FormData(evt.target));
  });
};

// Очистка формы, нажатие кнопки - очистить
const onClearForm = () => {
  adForm.reset();
  addMainMarker();
};

adForm.addEventListener('reset', onClearForm);

export {enterСoordinates, unlock, adDataSetSubmit};
