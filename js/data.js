import { getRandomInteger, getRandomArrayElement, createIdGenerator } from './util.js';

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

const generateId = createIdGenerator();
const generatePhotoId = createIdGenerator();
const generateNumber = createIdGenerator();

// Количество объектов
const SIMILAR_PHOTOS_COUNT = 25;

const createMockDates = () => ({
  id: generateNumber(),
  avatar: `img/avatar-${getRandomInteger(AVATARS.MIN, AVATARS.MAX)}.svg`,
  message: getRandomArrayElement(comments),
  name: getRandomArrayElement(names),
});

const createMockPictures = () => ({
  id: generateId(),
  url:  `photos/${generatePhotoId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES.MIN, LIKES.MAX),
  comments: Array.from({length: getRandomInteger(COMMENTS.MIN, COMMENTS.MAX)}, createMockDates),
});

const createPhotos = () => Array.from({length: SIMILAR_PHOTOS_COUNT}, createMockPictures);

export {createPhotos};
