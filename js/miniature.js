const similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');
const hiddenElem = container.querySelector('.visually-hidden');
hiddenElem.classList.remove('visually-hidden');

const similarPicsFragment = document.createDocumentFragment();

const generateRandomUsersPics = (pictures) => {

  pictures.forEach(({url, description, likes, comments, id}) => {
    const picElement = similarPictureTemplate.cloneNode(true);

    picElement.querySelector('.picture__img').src = url;
    picElement.querySelector('.picture__img').alt = description;
    picElement.querySelector('.picture__likes').textContent = likes;
    picElement.querySelector('.picture__comments').textContent = comments.length;
    picElement.dataset.picelementId = id;

    similarPicsFragment.append(picElement);
  });
  container.append(similarPicsFragment);
};

export { generateRandomUsersPics };
