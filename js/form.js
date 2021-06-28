const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');

const adFormChildren = adForm.querySelectorAll('fieldset');
const mapFilterChildren = mapFilter.querySelectorAll('.map__filter');

const listMinPriceHousing = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
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

unlock();
// КОНЕЦ блокировки и разблокировки
// Валидация Формы подачи объявления
const inputTitle = adForm.querySelector('#title');
const inputPrice = adForm.querySelector('#price');
const inputType = adForm.querySelector('#type');
const selectRoomNumber = adForm.querySelector('#room_number');
const inputCapacity = adForm.querySelector('#capacity');
const MIN_HEADING = 30;
const MAX_HEADING = 100;
const MAX_PRICE = 1000000;

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

const selectedPrice = inputType.querySelector('option[selected]').value;

let minPriceHousing = listMinPriceHousing[selectedPrice];
inputPrice.value = minPriceHousing;
inputType.addEventListener('change', () => {

  minPriceHousing = listMinPriceHousing[inputType.value];
  inputPrice.value = minPriceHousing;
});
inputPrice.addEventListener('input', () => {
  const valuePrice = inputPrice.value;
  if (valuePrice > MAX_PRICE) {
    inputPrice.setCustomValidity(`Значение должно быть меньше или равно ${MAX_PRICE}`);
  } else if (valuePrice < minPriceHousing) {
    inputPrice.setCustomValidity('Такой цены нет');
  } else {
    inputPrice.setCustomValidity('');
  }

  inputPrice.reportValidity();
});

// Валидация количества гостей

let numberRooms = selectRoomNumber.querySelector('option[selected]').value;
let numberGuests = inputCapacity.querySelector('option[selected]').value;

const checkGuests = (rooms, guests) => {
  if (rooms === '100') {
    if (guests !== '0') {
      inputCapacity.setCustomValidity('Выберите не для гостей');
    } else {
      inputCapacity.setCustomValidity('');
    }
  } else if (rooms === '3') {
    if (guests === '0') {
      inputCapacity.setCustomValidity('Выберите другое количество гостей');
    } else {
      inputCapacity.setCustomValidity('');
    }
  } else if (rooms === '2') {
    if (guests === '0' || guests === '3') {
      inputCapacity.setCustomValidity('Выберите другое количество гостей');
    } else {
      inputCapacity.setCustomValidity('');
    }
  } else if (rooms === '1') {
    if (guests === '0' || guests === '3' || guests === '2') {
      inputCapacity.setCustomValidity('Выберите другое количество гостей');
    } else {
      inputCapacity.setCustomValidity('');
    }
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
