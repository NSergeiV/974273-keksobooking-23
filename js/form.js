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
