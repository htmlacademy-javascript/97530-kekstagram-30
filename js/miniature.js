const similarPictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const containerElement = document.querySelector('.pictures');
const hiddenElement = containerElement.querySelector('.visually-hidden');
hiddenElement.classList.remove('visually-hidden');

const similarPicsFragment = document.createDocumentFragment();

const generateRandomUsersPics = (pictures) => {

  pictures.forEach(({url, description, likes, comments, id}) => {
    const picElement = similarPictureTemplateElement.cloneNode(true);

    picElement.querySelector('.picture__img').src = url;
    picElement.querySelector('.picture__img').alt = description;
    picElement.querySelector('.picture__likes').textContent = likes;
    picElement.querySelector('.picture__comments').textContent = comments.length;
    picElement.dataset.picelementId = id;

    similarPicsFragment.append(picElement);
  });
  containerElement.append(similarPicsFragment);
};

export { generateRandomUsersPics };
