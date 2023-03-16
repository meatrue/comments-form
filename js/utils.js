function padByZeros(string, symbolsCount) {
  const stringLength = string.length;
  const difference = symbolsCount - stringLength;
  let resultString = '';

  for (let i = 0; i < difference; i++) {
    resultString += '0';
  }

  return resultString + string;
}

export { padByZeros };
