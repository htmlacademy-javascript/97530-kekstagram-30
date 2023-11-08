import { getRandomInteger, getRandomArrayElement, createIdGenerator } from './util.js';
import { DESCRIPTIONS, LIKES, AVATARS, COMMENTS, comments, names } from './data.js';

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
