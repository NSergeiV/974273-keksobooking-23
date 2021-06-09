const SIMILAR_DATA = 10;
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

// Случайное число без плавающей точки

const getRandomInteger = function (min, max) {
  min = Math.abs(Math.ceil(min));
  max = Math.abs(Math.floor(max));
  if (min > max || min === max) {
    return 'Значение ДО больше или равно значению ОТ';
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Случайное число с плавающей точкой

const getRandomFloatingPointNumber = function (min, max, floating) {
  min = Math.abs(min);
  max = Math.abs(max);
  if (max < min || min === max) {
    return 'Значение ДО больше или равно значению ОТ';
  }

  const result = (Math.random() * (max - min)) + min;
  return parseFloat(result.toFixed(floating));
};

const typingServices = (array, quantity) => {
  const randomTyping = [];
  while (randomTyping.length < quantity) {
    const randomNamber = getRandomInteger(1, array.length);
    let found = false;
    for (let j = 0; j < randomTyping.length; j++) {
      if (randomTyping[j] === randomNamber) {
        found = true;
        break;
      }
    }
    if (!found) {
      randomTyping[randomTyping.length] = randomNamber;
    }
  }

  const newArray = [];
  for (let i = 0; i < randomTyping.length; i++) {
    newArray[i] = array[randomTyping[i] - 1];
  }
  return newArray;
};

// Массив с адресами изображений
const ordinalNumbers = [];
const imageAddress = [];

while (ordinalNumbers.length < 10) {
  const randomNamber = getRandomInteger(1, 11);
  let found = false;
  for (let i = 0; i < ordinalNumbers.length; i++) {
    if (ordinalNumbers[i] === randomNamber) {
      found = true;
      break;
    }
  }
  if (!found) {
    ordinalNumbers[ordinalNumbers.length] = randomNamber;
    imageAddress[ordinalNumbers.length - 1] = (randomNamber > 8) ? 'nothing' : `user0${randomNamber}`;
  }
}
// КОНЕЦ

let imgNumber = 0;
const assignAddress = () => {
  imgNumber = ++imgNumber;
  return imageAddress[imgNumber - 1];
};

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
      features: typingServices(FEATURES, getRandomInteger(1, 6)),
      description: getRandomArrayElement(DESCRIPTION),
      photos: typingServices(PHOTOS, getRandomInteger(1, 3)),
    },
    location: {
      lat: locationX,
      lng: locationY,
    },
  };
};

const objects = new Array(SIMILAR_DATA).fill(null).map(() => fillingObject());

objects;
