const getRandomInteger = function (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

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

const comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.'];

const names = ['Феврония', 'Рафаэль', 'Роза', 'Даниил', 'Захар', 'Диана', 'Малина'];

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
const SIMILAR_COMMENT_COUNT = getRandomInteger(COMMENTS.MIN, COMMENTS.MAX);

const createComment = function () {
  return {
    id: generateNumber(),
    avatar: `img/avatar-${getRandomInteger(AVATARS.MIN, AVATARS.MAX)}.svg`,
    message: getRandomArrayElement(comments),
    name: getRandomArrayElement(names),
  };
};

const similarComment = new Array(SIMILAR_COMMENT_COUNT).fill(null).map((element, index) => createComment(index));

const createPhoto = function () {
  return {
    id: generateId(),
    url:  `photos/${generatePhotoId()}.jpg`,
    descriprion: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(LIKES.MIN, LIKES.MAX),
    comments: similarComment,
  };
};
