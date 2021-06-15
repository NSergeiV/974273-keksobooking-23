import {getRandomInteger, getRandomFloatingPointNumber} from './utilRandom.js';
import {typingArray, assignAddress} from './utilArray.js';

const LATITUDE_MIN = 35.65000;
const LATITUDE_MAX = 35.70000;
const LONGITUDE_MIN = 139.70000;
const LONGITUDE_MAX = 139.80000;

const TITLES = ['Прекрасное гнездышко', 'Отличная квартира', 'Прекрасный вид', 'Солнечное место', 'Позитивная квартира', 'Просторное место', 'Императорский дворец', 'Суши на закате', 'Хрущевка, Аппартоменты'];

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const ARRIVALS = ['12:00', '13:00', '14:00'];

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const DESCRIPTION = ['Хозяин, собственник. Квартира с мебелью и техникой. Площадь указана с балконом. Собственник.', 'Срочно. Собственник, квартира без обременений,сделка 1 дня. Видовая квартира. Уникальная планировка с гардеробной, кухней гостиной и ленточной лоджией с витражным остеклением.', 'Большое количество коммерческих помещений. Технология строительства монолит/кирпич.', 'Уютные и модернизированные входные группы, консьерж, индивидуальные поквартирные счетчики. В шаговой доступности- Бульвар', 'Продаю однокомнатную квартиру с полностью готовым отличным свежим ремонтом! СОБСТВЕННИК! Все документы на руках.', 'Отличный дом ! Рядом с домом есть супермаркеты,школа,детский сад, Оз молл. Остановка в 2 минутах от дома.', 'Продам отличную просторную квартиру! Документы на руках, квартира готова к продаже.Один собственник! Без долгов и обременений!', 'Позвоните мне прямо сейчас! Эта квартира - идеальный вариант для жизни, сдачи и инвестиций.', 'КВАРТИРА С РЕМОНТОМ ОТ ЗАСТРОЙЩИКА!! Ламинат, натяжной потолок, межкомнатные двери, плитка, ванная, унитаз, раковина, смесители. Я СОБСТВЕННИК. ЖК Время.', 'Отличная шумоизоляция квартир, электроразводка и радиаторы отопления, стяжка пола , штукатурка стен.'];

const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const fillingObject = () => {
  const locationX = getRandomFloatingPointNumber(LATITUDE_MIN, LATITUDE_MAX, 5);
  const locationY = getRandomFloatingPointNumber(LONGITUDE_MIN, LONGITUDE_MAX, 5);
  return {
    author: {avatar: `img/avatars/${assignAddress()}.png`},
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${locationX}, ${locationY}`,
      price: getRandomInteger(5000, 100000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(1, 100),
      guests: getRandomInteger(1, 100),
      checkin: getRandomArrayElement(ARRIVALS),
      checkout: getRandomArrayElement(ARRIVALS),
      features: typingArray(FEATURES, getRandomInteger(1, 6)),
      description: getRandomArrayElement(DESCRIPTION),
      photos: typingArray(PHOTOS, getRandomInteger(1, 3)),
    },
    location: {
      lat: locationX,
      lng: locationY,
    },
  };
};

export {fillingObject};
