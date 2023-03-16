import { storage } from './local-storage.js';
import { comments } from './data-api.js';
import { getDateForComment } from './date.js';
import {
  IS_REMOVING_CLASS_NAME
} from './util-values.js';

const COMMENT_TEMPLATE_ID = 'comment-template';
const COMMENTS_LIST_CLASS_NAME = 'comments__list';
const COMMENT_ITEM_CLASS_NAME = 'comment';
const COMMENT_NAME_CLASS_NAME = 'comment__name';
const COMMENT_TEXT_CLASS_NAME = 'comment__text';
const COMMENT_TIME_CLASS_NAME = 'comment__time';
const COMMENT_LIKE_CLASS_NAME = 'comment__like';
const COMMENT_DELETE_CLASS_NAME = 'comment__delete';

const MILISECONDS_TO_HIDE_ITEM = 500;

const commentTemplate = document.querySelector(`#${COMMENT_TEMPLATE_ID}`)
  .content
  .querySelector(`.${COMMENT_ITEM_CLASS_NAME}`);

function renderCommentsList(comments) {
  const commentsListElement = document.querySelector(`.${COMMENTS_LIST_CLASS_NAME}`);

  if (!commentsListElement) return;

  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    commentsFragment.append(commentElement);
  });

  const commentsListElementClone = commentsListElement.cloneNode();
  commentsListElementClone.append(commentsFragment);
  commentsListElementClone.addEventListener('click', onCommentsListClick);

  commentsListElement.removeEventListener('click', onCommentsListClick);
  commentsListElement.replaceWith(commentsListElementClone);
}

function createCommentElement({id, name, text, date, time, like}) {
  if (!commentTemplate) return;

  const commentElement = commentTemplate.cloneNode(true);
  commentElement.dataset.id = id;

  const formattedDate = getDateForComment(date, time);

  setElement(commentElement, `.${COMMENT_NAME_CLASS_NAME}`, name);
  setElement(commentElement, `.${COMMENT_TEXT_CLASS_NAME}`, text);
  setElement(commentElement, `.${COMMENT_TIME_CLASS_NAME}`, formattedDate);

  const likeButton = commentElement.querySelector(`.${COMMENT_LIKE_CLASS_NAME}`);

  if (like) {
    likeButton.classList.add('isActive');
  }

  return commentElement;
}

function setElement(parent, selector, text) {
  const element = parent.querySelector(selector);
  element.textContent = text;
}

function onCommentsListClick(e) {
  const target = e.target;

  const isLikeButton = !!target.closest(`.${COMMENT_LIKE_CLASS_NAME}`);
  const isDeleteButton = !!target.closest(`.${COMMENT_DELETE_CLASS_NAME}`);

  if (!isLikeButton && !isDeleteButton) return;

  const commentElement = target.closest(`.${COMMENT_ITEM_CLASS_NAME}`);
  const commentId = commentElement.dataset.id;

  if (!commentId) return;

  let timeToRerender = 0;

  if (isLikeButton) {
    comments.toggleLike(Number(commentId));
  }

  if (isDeleteButton) {
    commentElement.classList.add(IS_REMOVING_CLASS_NAME);
    comments.deleteItem(Number(commentId));
    timeToRerender = MILISECONDS_TO_HIDE_ITEM;
  }

  setTimeout(() => {
    const commentsItems = comments.getItems();
    storage.saveComments(commentsItems);
    renderCommentsList(commentsItems)
  }, timeToRerender);
}

export { renderCommentsList };
