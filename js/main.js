import { storage } from './local-storage.js';
import { comments } from './data-api.js';
import { renderCommentsList } from './comments-list.js';
import { initCommentsForm } from './comments-form.js';

if (!comments.getItems().length) {
  try {
    const savedComments = storage.getComments();
    comments.setItems(savedComments);
  } catch (error) {
    console.log(error.message);
  }
}

initCommentsForm();
renderCommentsList(comments.getItems());
