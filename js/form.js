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
const imgUploadFormElement = document.querySelector('.img-upload__form');
const imgUploadOverlayElement = imgUploadFormElement.querySelector('.img-upload__overlay');
const imgUploadInputElement = imgUploadFormElement.querySelector('.img-upload__input');
const imgUploadPreviewElement = imgUploadFormElement.querySelector('.img-upload__preview img');
const btnCancelElement = imgUploadFormElement.querySelector('.img-upload__cancel');
const btnSubmitElement = imgUploadFormElement.querySelector('.img-upload__submit');
const hashtagFieldElement = imgUploadFormElement.querySelector('.text__hashtags');
const textFieldElement = imgUploadFormElement.querySelector('.text__description');
const effectsPreviewElement = imgUploadFormElement.querySelectorAll('.effects__preview');

const toggleSubmitButton = (isDisabled) => {
  btnSubmitElement.disabled = isDisabled;
  btnSubmitElement.textContent = isDisabled
    ? SubmitButtonTitle.SUBMITTING
    : SubmitButtonTitle.PUBLISH;
};

const pristine = new Pristine
(imgUploadFormElement,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
  },
  false
);

const showForm = () => {
  imgUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const hideForm = () => {
  imgUploadFormElement.reset();
  resetScale();
  resetEffect();
  pristine.reset();
  imgUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isFieldFocused = () =>
  document.activeElement === hashtagFieldElement ||
  document.activeElement === textFieldElement;

imgUploadFormElement.addEventListener('submit', (evt) => {
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
  const file = imgUploadInputElement.files[0];

  if (file && isValidType(file)) {
    imgUploadPreviewElement.src = URL.createObjectURL(file);
    effectsPreviewElement.forEach((element) => {
      element.style.backgroundImage = `url(${imgUploadPreviewElement.src})`;
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
  hashtagFieldElement,
  hasValidCount,
  errors.INVALID_COUNT,
  3,
  true
);

pristine.addValidator(
  hashtagFieldElement,
  hasUniqueTags,
  errors.NOT_REPEAT,
  2,
  true
);

pristine.addValidator(
  hashtagFieldElement,
  hasValidTags,
  errors.INVALID_PATTERN,
  1,
  true
);

imgUploadInputElement.addEventListener('change', onFileInputChange);
btnCancelElement.addEventListener('click', onFormButtonClickClose);
imgUploadFormElement.addEventListener('submit', onFormSubmit);
initEffect();
