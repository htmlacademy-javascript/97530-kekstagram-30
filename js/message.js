import { isEscapeKey } from './util.js';

const successMessageElement = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorMessageElement = document.querySelector('#error')
  .content
  .querySelector('.error');

const closeMessage = () => {
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  existElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('click', onBodyClick);
};

const onCloseButtonClick = () => {
  closeMessage();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

function onBodyClick (evt) {
  if (evt.target.closest('.success__inner') || (evt.target.closest('.error__inner'))) {
    return;
  }
  closeMessage();
}

const openMessage = (element, titleButton) => {
  document.body.append(element);
  document.body.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onDocumentKeydown);
  element.querySelector(titleButton)
    .addEventListener('click', onCloseButtonClick);
};

const openSuccesMessage = () => {
  openMessage(successMessageElement, '.success__button');
};

const openErrorMessage = () => {
  openMessage(errorMessageElement, '.error__button');
};

export { openSuccesMessage, openErrorMessage };
