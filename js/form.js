import { isEscapeKey } from './util.js';
import { init as initEffect, reset as resetEffect } from './slider.js';
import { resetScale } from './scale.js';
import { sendPictures } from './api.js';
import { openSuccesMessage, openErrorMessage } from './message.js';

const HASHTAG_REGEXP = /^#[a-za-яё0-9]{1,19}$/i;
const HASHTAG_COUNT = 5;
const FILE_TYPES = ['jpeg', 'jpg', 'png'];
const errors = {
  INVALID_COUNT: `Допустимо ${HASHTAG_COUNT} хэштегов`,
  NOT_REPEAT: 'Хэштеги не должны повторяться',
  INVALID_PATTERN: 'Введен невалидный хэштег',
};

const SubmitButtonTitle = {
  SUBMITTING: 'Отправляю...',
  PUBLISH: 'Опубликовать',
};

const bodyElement = document.querySelector('body');
const formLoadImg = document.querySelector('.img-upload__form');
const overlayUploadImg = formLoadImg.querySelector('.img-upload__overlay');
const inputUploadImg = formLoadImg.querySelector('.img-upload__input');
const closeImgButtonElement = formLoadImg.querySelector('.img-upload__cancel');
const hashtagField = formLoadImg.querySelector('.text__hashtags');
const commentField = formLoadImg.querySelector('.text__description');
const submitButton = formLoadImg.querySelector('.img-upload__submit');
//const fileField = formLoadImg.querySelector('.img-upload__input');
const loadPic = formLoadImg.querySelector('.img-upload__preview img');
const effectsPreview = formLoadImg.querySelectorAll('.effects__preview');

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled
    ? SubmitButtonTitle.SUBMITTING
    : SubmitButtonTitle.PUBLISH;
};

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

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const hideForm = () => {
  formLoadImg.reset();
  resetScale();
  resetEffect();
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

const isErrorMessageExist = () => Boolean(document.querySelector('.error'));

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isFieldFocused() && !isErrorMessageExist()) {
    evt.preventDefault();
    hideForm();
  }
}

const onFormButtonClickClose = () => {
  hideForm();
};

const onFileInputChange = () =>{
  const file = inputUploadImg.files[0];

  if (file && isValidType(file)) {
    loadPic.src = URL.createObjectURL(file);
    effectsPreview.forEach((index) => {
      index.style.backgroundImage = `url(${loadPic.src})`;
    });
  }
  showForm();
};

// Отправка формы
const sendForm = async (formElement) => {
  if (!pristine.validate()) {
    return;
  }

  try {
    toggleSubmitButton(true);
    await sendPictures(new FormData(formElement));
    hideForm();
    openSuccesMessage();
  } catch {
    openErrorMessage();
  } finally {
    toggleSubmitButton(false);
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendForm(evt.target);
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

inputUploadImg.addEventListener('change', onFileInputChange);
closeImgButtonElement.addEventListener('click', onFormButtonClickClose);
formLoadImg.addEventListener('submit', onFormSubmit);
initEffect();
