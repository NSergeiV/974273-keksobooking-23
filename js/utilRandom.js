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

export {getRandomInteger, getRandomFloatingPointNumber};
