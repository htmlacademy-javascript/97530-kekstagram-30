const checkLengthString = function (string, maxLength) {
  if (typeof string === 'string') {
    const result = string.length <= maxLength;
    {
      return result;
    }
  }
}

checkLengthString ('проверяемая строка', 10);

const checkPolindrom = (string) => {
  let result = '';
  result = string.toUpperCase().replaceAll(' ', '');

  let newString = '';
  let str = newString;

  for (let i = result.length - 1; i >= 0; i--) {
    newString = result.at(i);
    str = str + newString;
  }
  {
    return str === result;
  }
}

checkPolindrom('Лёша на полке клопа нашёл');
