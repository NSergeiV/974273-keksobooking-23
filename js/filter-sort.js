import {database} from './map.js';
import {selectMarkers} from './filter.js';

const checkFeatures = (choice, base) => {
  if (base) {
    return choice.every((feature) => base.includes(feature));
  }
  return true;
};

const checkGuests = (choice, base) => {
  if (choice !== 'any' && Number(choice) !== base) {
    return false;
  }
  return true;
};

const checkPrice = (choice, base) => {
  if (choice !== 'any') {
    if (choice === 'middle') {
      if (base < 10000 || base > 50000) {return false;}
      return true;
    }
    if (choice === 'low' && base >= 10000) {
      return false;
    }
    if (choice === 'high' && base <= 50000) {
      return false;
    }
    return true;
  }
  return true;
};

const checkRooms = (choice, base) => {
  if (choice !== 'any' && Number(choice) !== base) {
    return false;
  }
  return true;
};

const checkType = (choice, base) => {
  if (choice !== 'any' && choice !== base) {
    return false;
  }
  return true;
};

const sortAds = (adData) => {
  const copyDatabase = database.slice();
  const sortDatabase = copyDatabase.filter((ad) => checkFeatures(adData.features, ad.offer.features) && checkGuests(adData.guests, ad.offer.guests) && checkPrice(adData.price, ad.offer.price) && checkRooms(adData.rooms, ad.offer.rooms) && checkType(adData.type, ad.offer.type));
  selectMarkers(sortDatabase);
};

export {sortAds};
