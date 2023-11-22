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

export { isEscapeKey, showErrorMessage };
