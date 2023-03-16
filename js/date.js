import { padByZeros } from './utils.js';

import {
  TODAY,
  YESTERDAY,
  DATE_DEFAULT_DELIMITER,
  DATE_DELIMITER,
  FORMATTED_DATE_DELIMITER
} from './util-values.js';

function getDateForComment(dateString, timeString) {
  const dateElements = dateString.split(DATE_DELIMITER);
  const dayOfMonth = dateElements[0];
  const month = dateElements[1];

  const dayOfMonthToday = new Date().getDate();
  const monthToday = new Date().getMonth() + 1;

  if (Number(dayOfMonth) === Number(dayOfMonthToday)
    && Number(month) === Number(monthToday)) {
    return `${TODAY}${FORMATTED_DATE_DELIMITER}${timeString}`;
  }

  if (Number(dayOfMonth) === Number(dayOfMonthToday) - 1
    && Number(month) === Number(monthToday)) {
    return `${YESTERDAY}${FORMATTED_DATE_DELIMITER}${timeString}`;
  }

  return `${dateString}${FORMATTED_DATE_DELIMITER}${timeString}`;
}

function getFormattedDateFromField(dateString) {
  const dateElements = dateString.split(DATE_DEFAULT_DELIMITER);
  const invertedDateElements = [];

  for (let i = dateElements.length - 1; i >= 0; i--) {
    invertedDateElements.push(dateElements[i]);
  }

  return invertedDateElements.join(DATE_DELIMITER);
}

function getDateString(dateElements, delimiter) {
  const paddedDateElements = dateElements.map((dateElement) => padByZeros(String(dateElement), 2));

  return paddedDateElements.join(delimiter);
}

export {
  getDateString,
  getDateForComment,
  getFormattedDateFromField
};
