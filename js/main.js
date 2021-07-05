import './map.js';
import {fillingObject} from './data.js';
import {generatingPosters} from './map.js';

const SIMILAR_DATA = 10;

const objects = new Array(SIMILAR_DATA).fill(null).map(() => fillingObject());

generatingPosters(objects);

