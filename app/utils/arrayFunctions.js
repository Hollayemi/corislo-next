export const removeOrAddToArray = (item, array, func, steps) => {
  if (array.includes(item)) {
    const newItem = array.filter((x) => x !== item);
    func(() => newItem);
  } else {
    func([...array, item]);
  }
};

export const getCommonValuesInArrays = (...arrays) => {
  if (arrays.length === 0) {
    // Handle the case of no arrays provided
    return [];
  }

  // Use reduce to iteratively find common values
  const commonValues = arrays.reduce((accumulator, currentArray) => {
    return accumulator.filter((value) => currentArray.includes(value));
  });

  return commonValues;
};
