import './map.js';
// import {fillingObject} from './data.js';
import {getData} from './create-fetch.js';
import {generatingPosters} from './map.js';
import {adDataSetSubmit} from './form.js';
import {pushGoodData, errorPushData} from './banner-pushServer.js';

// const SIMILAR_DATA = 10;

// const objects = new Array(SIMILAR_DATA).fill(null).map(() => fillingObject());

// generatingPosters(objects);

getData((ads) => {
  generatingPosters(ads);
});

adDataSetSubmit(pushGoodData, errorPushData);
