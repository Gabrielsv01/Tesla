const dictionary = {
  '0': [0],
  '1': [1],
  '2': [2],
  '3': [3],
  '4': [4],
  '5': [5],
  '6': [6],
  '7': [7],
  '8': [8],
  '9': [9],
};

const buildNumbers = (value: number) => {
  const modNumber = 9;
  const dictionaryKey = '1';

  for (let i = 1; i < value; i += 1) {
    const lastItem =
      dictionary[dictionaryKey][dictionary[dictionaryKey].length - 1];
    dictionary[dictionaryKey].push(lastItem + modNumber);
  }
  return dictionary[dictionaryKey];
};

export {buildNumbers};
