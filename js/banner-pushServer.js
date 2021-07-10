import {onClearForm} from './form.js';
import {closeBanner} from './close-banner.js';

const mainBody = document.querySelector('body');
const templateMessage = document.querySelector('#success').content.querySelector('.success');
const templateCope = templateMessage.cloneNode(true);
const templateError = document.querySelector('#error').content.querySelector('.error');
const templateCopeError = templateError.cloneNode(true);

// Банер удачной отправик данных
const pushGoodData = () => {
  onClearForm();
  mainBody.insertAdjacentElement('beforeend', templateCope);
  closeBanner(templateCope);
};

// Банер неудачной отправки
const errorPushData = () => {
  mainBody.insertAdjacentElement('beforeend', templateCopeError);
  closeBanner(templateCopeError);
};

export {pushGoodData, errorPushData};
