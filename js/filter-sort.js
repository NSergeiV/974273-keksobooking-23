import {database} from './map.js';
import {selectMarkers} from './filter.js';

const sortAds = (adData) => {
  // console.log(adData);
  // console.log(database);
  const copyDatabase = database.slice();
  const sortDatabase = copyDatabase.filter((ad) => {
    if (adData.type === 'any') {
      return true;
    }
    return adData.type === ad.offer.type;
  });
  // console.log(sortDatabase);
  selectMarkers(sortDatabase);
};

export {sortAds};
