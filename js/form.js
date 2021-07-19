import {sendData} from './create-fetch.js';
import {addMainMarker} from './map.js';
import {mapFilter, mapFilterChildren, onClearFilter} from './filter.js';
import {addPhoto} from './upload-image.js';

const MIN_HEADING = 30;
const MAX_HEADING = 100;
const MAX_PRICE = 1000000;

const adForm = document.querySelector('.ad-form');
const adFormChildren = adForm.querySelectorAll('fieldset');
const inputTitle = adForm.querySelector('#title');
const inputPrice = adForm.querySelector('#price');
const inputType = adForm.querySelector('#type');
const selectRoomNumber = adForm.querySelector('#room_number');
const inputCapacity = adForm.querySelector('#capacity');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const inputAddress = adForm.querySelector('#address');
const buttonReset = adForm.querySelector('.ad-form__reset');
const adFormField = adForm.querySelector('.ad-form__field input[type=file]');
const adFormHeaderPreview = adForm.querySelector('.ad-form-header__preview');
const adFormUpload = adForm.querySelector('.ad-form__upload input[type=file');
const adFormPhoto =adForm.querySelector('.ad-form__photo');

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

const createBlock = () => {
  const photoHousing = document.createElement('img');
  photoHousing.style.width = `${70}px`;
  photoHousing.style.height = `${70}px`;
  adFormPhoto.appendChild(photoHousing);
};

adFormField.addEventListener('change', () => {
  const file = adFormField.files[0];
  addPhoto(file, adFormHeaderPreview);
});

adFormUpload.addEventListener('change', () => {
  const file = adFormUpload.files[0];
  if (!adFormPhoto.querySelector('img')) {createBlock();}
  addPhoto(file, adFormPhoto);
});

const blockIt = (block, listChildren) => {
  block.classList.add('ad-form--disabled');
  listChildren.forEach((item) => {
    item.setAttribute('disabled', '');
  });
};

blockIt(adForm, adFormChildren);
blockIt(mapFilter, mapFilterChildren);

const unlockForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormChildren.forEach((item) => {
    item.removeAttribute('disabled');
  });
};

const enterСoordinates = (lat, lng) => {
  inputAddress.value = `${Number(lat.toFixed(5))}, ${Number(lng.toFixed(5))}`;
};

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

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

const adDataSetSubmit = (onSuccess, onError) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(() => onSuccess(), () => onError(), new FormData(evt.target));
  });
};

const onClearForm = () => {
  adForm.reset();
  adFormHeaderPreview.querySelector('img').src = 'img/muffin-grey.svg';
  if (adFormPhoto.querySelector('img')) {adFormPhoto.querySelector('img').remove();}
  addMainMarker();
  onClearFilter();
};

buttonReset.addEventListener('click', onClearForm);

export {enterСoordinates, unlockForm, adDataSetSubmit, onClearForm, inputAddress};
