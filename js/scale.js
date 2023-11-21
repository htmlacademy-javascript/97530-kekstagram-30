const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;
const SCALE_DEFAULT = 100;

const modalElement = document.querySelector('.img-upload');
const controllSmaller = modalElement.querySelector('.scale__control--smaller');
const controllBigger = modalElement.querySelector('.scale__control--bigger');
const imageElement = modalElement.querySelector('.img-upload__preview img');
const fieldValue = modalElement.querySelector('.scale__control--value');

const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  fieldValue.value = `${value}%`;
};

const onControllSmallerClick = () => {
  let currentValue = (parseInt(fieldValue.value, 10) - SCALE_STEP);
  if (currentValue < SCALE_MIN) {
    currentValue = SCALE_MIN;
  }
  scaleImage(currentValue);
};

const onControllBiggerClick = () => {
  let currentValue = (parseInt(fieldValue.value, 10) + SCALE_STEP);
  if (currentValue > SCALE_MAX) {
    currentValue = SCALE_MAX;
  }
  scaleImage(currentValue);
};

const resetScale = () => scaleImage(SCALE_DEFAULT);

controllSmaller.addEventListener('click', onControllSmallerClick);
controllBigger.addEventListener('click', onControllBiggerClick);

export { resetScale };
