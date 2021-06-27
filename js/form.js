const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');

const adFormChildren = adForm.querySelectorAll('fieldset');
const mapFilterChildren = mapFilter.querySelectorAll('.map__filter');

const blockIt = (block, listChildren) => {
  block.classList.add('ad-form--disabled');
  listChildren.forEach((item) => {
    item.setAttribute('disabled', '');
  });
};

blockIt(adForm, adFormChildren);
blockIt(mapFilter, mapFilterChildren);

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

// Валидация Формы подачи объявления
const inputTitle = adForm.querySelector('#title');
const inputPrice = adForm.querySelector('#price');
const inputType = adForm.querySelector('#type');
const MIN_HEADING = 30;
const MAX_HEADING = 100;
const MAX_PRICE = 1000000;

inputTitle.addEventListener('input', (evt) => {
  const valueLength = inputTitle.value.length;
  if (valueLength < MIN_HEADING) {
    inputTitle.setCustomValidity(`Не хватает ${MIN_HEADING - valueLength} символ`);
  } else if (valueLength > MAX_HEADING) {
    inputTitle.setCustomValidity(`Лишний ${valueLength - MAX_HEADING} символ`);
  } else {
    inputTitle.setCustomValidity('');
  }

  inputTitle.reportValidity();
});
inputPrice.addEventListener('input', (evt) => {
  const valuePrice = inputPrice.value;
  if (valuePrice > MAX_PRICE) {
    inputPrice.setCustomValidity(`Значение должно быть меньше или равно ${MAX_PRICE}`);
  } else {
    inputPrice.setCustomValidity('');
  }

  inputPrice.reportValidity();
});
