const REMOVE_ERROR_MESSAGE = 5000;
const isEscapeKey = (evt) => evt.key === 'Escape';


const errorMessageTemplate = document.querySelector('#data-error')
  .content
  .querySelector('.data-error');

const showErrorMessage = () => {
  const errorElement = errorMessageTemplate.cloneNode(true);
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, REMOVE_ERROR_MESSAGE);
};

const getRandomInteger = function (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createUniqueItem () {
  let lastUniqueItem = 0;

  return function () {
    lastUniqueItem += 1;
    return lastUniqueItem;
  };
}

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { isEscapeKey, showErrorMessage, getRandomInteger, createUniqueItem, debounce };
