import { renderGallery } from './gallery.js';
import { debounce } from './util.js';

const filterElement = document.querySelector('.img-filters');
const MAX_RANDOM_FILTER = 10;
const filterForm = document.querySelector('.img-filters__form');
const defaultBtn = filterForm.querySelector('#filter-default');
const randomBtn = filterForm.querySelector('#filter-random');
const discussedBtn = filterForm.querySelector('#filter-discussed');

const filterEnum = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));

const filterHandlers = {
  [filterEnum.DEFAULT]: (data) => data,

  [filterEnum.RANDOM]: (data) => {
    const randomIndexList = [];

    const max = Math.min(MAX_RANDOM_FILTER, data.length);

    while(randomIndexList.length < max) {
      const randomIndex = getRandomIndex(0, data.length);

      if(!randomIndexList.includes(randomIndex)) {
        randomIndexList.push(randomIndex);
      }
    }
    return randomIndexList.map((index) => data[index]);
  },

  [filterEnum.DISCUSSED]: (data) =>
    [...data].sort((item1, item2) =>
      item2.comments.length - item1.comments.length)
};

const filterButtonToggle = (event) => {
  const currentActive = filterForm.querySelector('.img-filters__button--active');
  currentActive.classList.remove('img-filters__button--active');
  event.target.classList.add('img-filters__button--active');
};

const repaint = (event, filter, data) => {
  const filteredData = filterHandlers[filter](data);
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) => item.remove());
  renderGallery(filteredData);
};

const debouncedRepaint = debounce(repaint);

const applyFilter = (data) => {
  filterElement.classList.remove('img-filters--inactive');
  defaultBtn.addEventListener('click', (event) => {
    debouncedRepaint(event, filterEnum.DEFAULT, data);
    filterButtonToggle(event);
  });

  randomBtn.addEventListener('click', (event) => {
    debouncedRepaint(event, filterEnum.RANDOM, data);
    filterButtonToggle(event);
  });

  discussedBtn.addEventListener('click', (event) => {
    debouncedRepaint(event, filterEnum.DISCUSSED, data);
    filterButtonToggle(event);
  });
};

export { applyFilter };
