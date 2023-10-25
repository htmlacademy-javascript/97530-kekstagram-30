const ID = {
  MIN: 1,
  MAX: 25,
};

const PHOTOS = {
  MIN: 1,
  MAX: 25,
};

const NUMBER = {
  MIN: 1,
  MAX: 200,
};

const DESCRIPTIONS = ['В кафе на морском берегу', 'Рассвет на море на восточном побережье полуострова Ситония - солнце всходит над горой Афон',
  'Закат на море - безусловно, тоже великолепное и вдохновляющее зрелище!', 'Жизнь никогда не будет прежней после этого блюда',
  'Творчество бывает разным... у меня оно выглядит так'];

const LIKES = {
  MIN: 15,
  MAX: 200,
};

const AVATARS = {
  MIN: 1,
  MAX: 6,
};

const COMMENTS = {
  MIN: 0,
  MAX: 30,
};

const ANNOTATES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const NAMES = ['Феврония', 'Рафаэль', 'Роза', 'Даниил', 'Захар', 'Диана', 'Малина'];

// Функция, создающая случайное число
const getRandomInteger = function (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Функция, создающая уникальный ID
function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
      let currentValue = getRandomInteger(min, max);
      if (previousValues.length >= (max - min + 1)) {
          return null;
      }
      while (previousValues.includes(currentValue)) {
          currentValue = getRandomInteger(min, max);
      }
      previousValues.push(currentValue);
      return currentValue;
  };
}

const generateId = createRandomIdFromRangeGenerator(ID.MIN, ID.MAX);
const generatePhotoId = createRandomIdFromRangeGenerator(PHOTOS.MIN, PHOTOS.MAX);
const generateNumber = createRandomIdFromRangeGenerator(NUMBER.MIN, NUMBER.MAX);

// Количество объектов
const SIMILAR_PHOTOS_COUNT = 25;

const createMockDates = function () {
  return {
      id: generateNumber(),
      avatar: `img/avatar-${getRandomInteger(AVATARS.MIN, AVATARS.MAX)}.svg`,
      message: getRandomArrayElement(ANNOTATES),
      name: getRandomArrayElement(NAMES),
  };
};

const createMockPictures = function () {
  return {
      id: generateId(),
      url: `photos/${generatePhotoId()}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInteger(LIKES.MIN, LIKES.MAX),
      comments: Array.from({length: getRandomInteger(COMMENTS.MIN, COMMENTS.MAX)}, createMockDates),
  };
};

const similarMockPicture = new Array(SIMILAR_PHOTOS_COUNT).fill(null).map((element, index) => createMockPictures(index));
console.log(similarMockPicture);
