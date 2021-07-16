import {database} from './map.js';
import {selectMarkers} from './filter.js';

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

export {sortAds};
