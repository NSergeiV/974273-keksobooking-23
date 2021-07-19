import './map.js';
import {adDataSetSubmit} from './form.js';
import {pushGoodData, errorPushData} from './banner-push-server.js';

adDataSetSubmit(pushGoodData, errorPushData);

