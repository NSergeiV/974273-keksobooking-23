const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');

const adFormChildren = adForm.querySelectorAll('fieldset');
const mapFilterChildren = mapFilter.children;

const blockIt = (block, children) => {
  block.classList.add('ad-form--disabled');
  children.forEach((item) => {
    item.setAttribute('disabled', '');
  });
};

blockIt(adForm, adFormChildren);
blockIt(mapFilter, mapFilterChildren);
