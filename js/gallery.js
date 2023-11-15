import { generateRandomUsersPics } from './miniature.js';
import { showPicture } from './picture.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const picElem = evt.target.closest('[data-picelement-id]');

    if (! picElem) {
      return;
    }

    evt.preventDefault();
    const picElementId = +picElem.dataset.picelementId;
    const pictureData = pictures.find(({ id }) => id === picElementId);
    showPicture(pictureData);

  });

  generateRandomUsersPics(pictures, container);
};

export { renderGallery };
