import { isEscapeKey } from './util.js';

const HASHTAG_REGEXP = /^#[a-za-яё0-9]{1,19}$/i;
const HASHTAG_COUNT = 5;
const errors = {
  INVALID_COUNT: `Допустимо ${HASHTAG_COUNT} хэштегов`,
  NOT_REPEAT: 'Хэштеги не должны повторяться',
  INVALID_PATTERN: 'Введен невалидный хэштег',
};

const bodyElement = document.querySelector('body');
const formLoadImg = document.querySelector('.img-upload__form');
const overlayUploadImg = formLoadImg.querySelector('.img-upload__overlay');
const inputUploadImg = formLoadImg.querySelector('.img-upload__input');
const closeImgButtonElement = formLoadImg.querySelector('.img-upload__cancel');
const hashtagField = formLoadImg.querySelector('.text__hashtags');
const commentField = formLoadImg.querySelector('.text__description');

const pristine = new Pristine
(formLoadImg,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
  },
  false
);

const showForm = () => {
  overlayUploadImg.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideForm = () => {
  formLoadImg.reset();
  pristine.reset();
  overlayUploadImg.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

formLoadImg.addEventListener('submit', (evt) => {
  evt.preventDefault();
});

const commonHashtags = (hashString) => {
  hashString
    .trim()
    .split(' ')
    .filter((elem) => elem !== '');
  const newStr = hashString.trim().split(' ').filter((elem) => elem !== '');

  return newStr;
};

const hasValidCount = (value) => commonHashtags(value).length <= HASHTAG_COUNT;

const hasValidTags = (value) => commonHashtags(value).every((elem) => HASHTAG_REGEXP.test(elem));

const hasUniqueTags = (value) => {
  const lowerCaseHashtag = commonHashtags(value).map((hashtag) => hashtag.toLowerCase());
  return lowerCaseHashtag.length === new Set(lowerCaseHashtag).size;
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isFieldFocused()) {
    evt.preventDefault();
    hideForm();
  }
}

const onFormButtonClickClose = () => {
  hideForm();
};

const onInputUploadImg = () => {
  showForm();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

pristine.addValidator(
  hashtagField,
  hasValidCount,
  errors.INVALID_COUNT,
  3,
  true
);

pristine.addValidator(
  hashtagField,
  hasUniqueTags,
  errors.NOT_REPEAT,
  2,
  true
);

pristine.addValidator(
  hashtagField,
  hasValidTags,
  errors.INVALID_PATTERN,
  1,
  true
);

inputUploadImg.addEventListener('change', onInputUploadImg);
closeImgButtonElement.addEventListener('click', onFormButtonClickClose);
formLoadImg.addEventListener('submit', onFormSubmit);
