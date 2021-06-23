import {fillingObject} from './data.js';
import {generatingPosters} from './generating-posters.js';

const SIMILAR_DATA = 10;

const objects = new Array(SIMILAR_DATA).fill(null).map(() => fillingObject());

generatingPosters(objects[0]);

