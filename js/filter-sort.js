import {database} from './map.js';
import {selectMarkers} from './filter.js';

const checkFeatures = (choice, base) => {
  if (base) {
    // console.log(choice.length);
    if (choice.length !== 0) {
      // const result = true;
      choice.forEach((it) => {
        // console.log(base.filter((item) => item === it));
        // console.log(base.some((item) => item === it));
        if (base.some((item) => it === item) === false) {return false;}
      });
      return true;
    }
    return true;
  }
  return true;
};

const checkGuests = (choice, base) => {
  if (choice !== 'any') {
    if (Number(choice) !== base) {return false;}
    return true;
  }
  return true;
};

const checkPrice = (choice, base) => {
  if (choice !== 'any') {
    if (choice === 'middle') {

      if (base < 10000 || base > 50000) {return false;}
    }
    if (choice === 'low') {

      if (base >= 10000) {return false;}
    }
    if (choice === 'high') {

      if (base <= 50000) {return false;}
    }
    return true;
  }
  return true;
};

const checkRooms = (choice, base) => {
  if (choice !== 'any') {
    if (Number(choice) !== base) {return false;}
    return true;
  }
  return true;
};

const checkType = (choice, base) => {
  if (choice !== 'any') {
    if (choice !== base) {return false;}
    return true;
  }
  return true;
};

const sortAds = (adData) => {
  const copyDatabase = database.slice();
  const sortDatabase = copyDatabase.filter((ad) => checkFeatures(adData.features, ad.offer.features) && checkGuests(adData.guests, ad.offer.guests) && checkPrice(adData.price, ad.offer.price) && checkRooms(adData.rooms, ad.offer.rooms) && checkType(adData.type, ad.offer.type));
  selectMarkers(sortDatabase);
};
/*
const sortAds = (adData) => {
  const check = () => {

    let result = true;

    if (adData.features.length !== 0) {

      result = false;
    }
    if (adData.guests !== 'any') {
      result = false;
    }
    if (adData.price !== 'any') {
      result = false;
    }
    if (adData.rooms !== 'any') {
      result = false;
    }
    if (adData.type !== 'any') {
      result = false;
    }

    return result;
  };
  const copyDatabase = database.slice();

  if (check()) {
    selectMarkers(database);
  } else {
    const sortDatabase = copyDatabase.filter((ad) => {

      let result = true;

      if (ad.offer.features) {
        if (adData.features.length !== 0) {

          adData.features.forEach((it) => {
            if (ad.offer.features.some((item) => item === it) === false) {return result = false;}
          });
        }
      }

      if (adData.guests !== 'any') {
        if (Number(adData.guests) !== ad.offer.guests) {result = false;}
      }
return
      if (adData.price !== 'any') {
        if (adData.price === 'middle') {

          if (ad.offer.price < 10000 || ad.offer.price > 50000) {result = false;}
        }
        if (adData.price === 'low') {

          if (ad.offer.price >= 10000) {result = false;}
        }
        if (adData.price === 'high') {

          if (ad.offer.price <= 50000) {result = false;}
        }
      }

      if (adData.rooms !== 'any') {
        if (Number(adData.rooms) !== ad.offer.rooms) {result = false;}
      }
      if (adData.type !== 'any') {
        if (adData.type !== ad.offer.type) {result = false;}
      }

      return result;
    });

    selectMarkers(sortDatabase);
  }
};
*/
export {sortAds};
