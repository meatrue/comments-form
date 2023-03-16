const validationError = {
  name: 'Введите имя',
  text: 'Введите текст'
};

class Validation {
  name(value) {
    return !!value.trim().length;
  }

  text(value) {
    return !!value.trim().length;
  }
}

export {
  Validation,
  validationError
};
