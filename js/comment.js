const bigPictureElement = document.querySelector('.big-picture');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsloaderElement = bigPictureElement.querySelector('.comments-loader');

const commentElement = document
  .querySelector('#comment')
  .content
  .querySelector('.social__comment');

const createComment = ({ avatar, message, name }) => {
  const newComment = commentElement.cloneNode(true);

  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const renderComments = (comments) => {
  commentListElement.innerHTML = '';
  const fragment = document.createDocumentFragment();
  comments.forEach((item) => {
    const comment = createComment(item);
    fragment.append(comment);
  });

  commentListElement.append(fragment);
};

const initCommentList = () => {
  commentCountElement.classList.add('hidden');
  commentsloaderElement.classList.add('hidden');
};

export { renderComments, initCommentList };
