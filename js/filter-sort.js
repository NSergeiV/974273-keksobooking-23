import {database} from './map.js';
import {selectMarkers} from './filter.js';

const ANY_CHOICE = 'any';
const MIDDLE_CHOICE = 'middle';
const LOW_CHOICE = 'low';
const HIGH_CHOICE = 'high';
const MIN_PRICE = 10000;
const MAX_PRICE = 50000;

const checkSelection = (choice, base) => {
  if (choice.length === 1) {
    choice = Number(choice);
  }
  if (choice !== ANY_CHOICE && choice !== base) {
    return false;
  }
  return true;
};

const checkFeatures = (choice, base) => {
  if (base) {
    return choice.every((feature) => base.includes(feature));
  }
  return true;
};

const checkGuests = (choice, base) => checkSelection(choice, base);

const checkRooms = (choice, base) => checkSelection(choice, base);

const checkType = (choice, base) => checkSelection(choice, base);

const checkPrice = (choice, base) => {
  if (choice === ANY_CHOICE) {
    return true;
  }
  if (choice === MIDDLE_CHOICE) {
    return base >= MIN_PRICE && base <= MAX_PRICE;
  }
  if (choice === LOW_CHOICE) {
    return base < MIN_PRICE;
  }
  if (choice === HIGH_CHOICE ) {
    return base > MAX_PRICE;
  }
  return true;
};

const sortAds = (adData) => {
  const copyDatabase = database.slice();
  const sortDatabase = copyDatabase.filter((ad) => checkFeatures(adData.features, ad.offer.features) && checkGuests(adData.guests, ad.offer.guests) && checkPrice(adData.price, ad.offer.price) && checkRooms(adData.rooms, ad.offer.rooms) && checkType(adData.type, ad.offer.type));
  selectMarkers(sortDatabase);
};

export {sortAds};
