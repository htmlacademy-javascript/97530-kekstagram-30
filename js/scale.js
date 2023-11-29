const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;
const SCALE_DEFAULT = 100;

const modalElement = document.querySelector('.img-upload');
const controllSmallerElement = modalElement.querySelector('.scale__control--smaller');
const controllBiggerElement = modalElement.querySelector('.scale__control--bigger');
const imageUploadPreviewElement = modalElement.querySelector('.img-upload__preview img');
const scaleValueElement = modalElement.querySelector('.scale__control--value');

const scaleImage = (value) => {
  imageUploadPreviewElement.style.transform = `scale(${value / 100})`;
  scaleValueElement.value = `${value}%`;
};

const onControllSmallerClick = () => {
  let currentValue = (parseInt(scaleValueElement.value, 10) - SCALE_STEP);
  if (currentValue < SCALE_MIN) {
    currentValue = SCALE_MIN;
  }
  scaleImage(currentValue);
};

const onControllBiggerClick = () => {
  let currentValue = (parseInt(scaleValueElement.value, 10) + SCALE_STEP);
  if (currentValue > SCALE_MAX) {
    currentValue = SCALE_MAX;
  }
  scaleImage(currentValue);
};

const resetScale = () => scaleImage(SCALE_DEFAULT);

controllSmallerElement.addEventListener('click', onControllSmallerClick);
controllBiggerElement.addEventListener('click', onControllBiggerClick);

export { resetScale };
