import { renderGallery } from './gallery.js';
import { initForm } from './form.js';
import { loadPictures } from './api.js';
import { showErrorMessage } from './util.js';
import { applyFilter } from './filters.js';

async function bootstrap() {
  try {
    const pictures = await loadPictures();
    renderGallery(pictures);
    applyFilter(pictures);
  } catch (error) {
    showErrorMessage();
  }
}

initForm();
bootstrap();
