import { createPhotos } from './mock.js';

const similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const otherPicOfUsers = document.querySelector('.pictures');
const hiddenElem = otherPicOfUsers.querySelector('.visually-hidden');
hiddenElem.classList.remove('visually-hidden');
const similarPics = createPhotos();

const similarPicsFragment = document.createDocumentFragment();

const generateRandomUsersPics = () => {

  similarPics.forEach(({url, description, likes, comments}) => {
    const picElement = similarPictureTemplate.cloneNode(true);

    picElement.querySelector('.picture__img').src = url;
    picElement.querySelector('.picture__img').alt = description;
    picElement.querySelector('.picture__likes').textContent = likes;
    picElement.querySelector('.picture__comments').textContent = comments.length;

    similarPicsFragment.append(picElement);
  });
  otherPicOfUsers.append(similarPicsFragment);
};

export { generateRandomUsersPics };
