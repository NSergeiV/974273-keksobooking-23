import {getRandomInteger} from './utilRandom.js';
// Набираем массивы данных
// Массив с данными сервиса или фото

const typingArray = (array, quantity) => {
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


let imgNumber = 0;
const assignAddress = () => {
  imgNumber = ++imgNumber;
  return imageAddress[imgNumber - 1];
};

// КОНУЦ набора массивов
export {typingArray, assignAddress};
