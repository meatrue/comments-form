import {
  getFormattedDateFromField,
  getDateString
} from './date.js';

import {
  IS_ERROR_CLASS_NAME,
  IS_ACTIVE_CLASS_NAME,
  DATE_DELIMITER,
  TIME_DELIMITER,
} from './util-values.js';

import { storage } from './local-storage.js';
import { comments } from './data-api.js';

import { renderCommentsList } from './comments-list.js';

import {
  Validation,
  validationError
} from './validation.js';

const FORM_CLASS_NAME = 'comments__form';
const NAME_FIELD_NAME = 'name';
const TEXT_FIELD_NAME = 'text';
const DATE_FIELD_NAME = 'date';
const ERROR_LABEL_CLASS_NAME = 'error-label';


const commentsForm = document.querySelector(`.${FORM_CLASS_NAME}`);

class CommentsForm {
  constructor(formElement) {
    this.nameField = commentsForm.elements[NAME_FIELD_NAME];
    this.textField = commentsForm.elements[TEXT_FIELD_NAME];
    this.dateField = commentsForm.elements[DATE_FIELD_NAME];

    this.nameField.focus();

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onFormInput = this.onFormInput.bind(this);
    this.onFormKeyPress = this.onFormKeyPress.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.isValid = this.isValid.bind(this);

    formElement.addEventListener('submit', this.onFormSubmit);
    formElement.addEventListener('input', this.onFormInput);
    formElement.addEventListener('keypress', this.onFormKeyPress);
  }

  onFormSubmit(e) {
    e.preventDefault();
    const form = e.target;

    this.submitForm(form);
  }

  onFormInput(e) {
    const target = e.target;
    this.hideError(target);
  }

  onFormKeyPress(e) {
    const target = e.target;

    if (target === this.textField && e.ctrlKey) {
      this.submitForm(target.form);
    }
  }

  submitForm(form) {
    const name = this.nameField.value;
    const text = this.textField.value;
    let date = this.dateField.value;

    if (!this.isValid([this.nameField, this.textField])) return;

    const now = new Date();
    const time = getDateString([now.getHours(), now.getMinutes()], TIME_DELIMITER);

    date = !date
      ? `${now.getDate()}${DATE_DELIMITER}${now.getMonth() + 1}${DATE_DELIMITER}${now.getFullYear()}`
      : getFormattedDateFromField(date);

    form.reset();
    comments.addItem({name, text, date, time});
    const commentsItems = comments.getItems();
    storage.saveComments(commentsItems);
    renderCommentsList(commentsItems);
  }

  isValid(fieldsToValidate) {
    const validate = new Validation();
    let isValid = true;

    fieldsToValidate.forEach((field) => {
      const validateField = validate[field.name];
      const isFieldValid = validateField(field.value);

      if (!isFieldValid) {
        this.showoError(field);
      }

      isValid = isValid && isFieldValid;
    });

    return isValid;
  }

  showoError(field) {
    field.classList.add(IS_ERROR_CLASS_NAME);
    const fieldName = field.name;
    const errorLabel = document.querySelector(`[name=${fieldName}] ~ .${ERROR_LABEL_CLASS_NAME}`);
    errorLabel.classList.add(IS_ACTIVE_CLASS_NAME);
    errorLabel.textContent = validationError[fieldName];
  }

  hideError(field) {
    field.classList.remove(IS_ERROR_CLASS_NAME);
    const fieldName = field.name;
    const errorLabel = document.querySelector(`[name=${fieldName}] ~ .${ERROR_LABEL_CLASS_NAME}`);
    errorLabel.classList.remove(IS_ACTIVE_CLASS_NAME);
    errorLabel.textContent = '';
  }
}

function initCommentsForm() {
  if (!commentsForm) return;

  new CommentsForm(commentsForm);
}

export { initCommentsForm };
