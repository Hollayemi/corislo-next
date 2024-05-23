export const removeOrAddToArray = (item, array, func, itemIsArray) => {
  if (array.includes(item) || isArraySubset(item, array, itemIsArray)) {
    const newItem = array.filter((x) =>
      itemIsArray ? item.includes(x) : x !== item
    );
    func(() => newItem);
  } else {
    if (itemIsArray) {
      func([...array, ...item]);
    } else {
      func([...array, item]);
    }
  }
};

export const isArraySubset = (
  subsetArray = [],
  supersetArray = [],
  itemIsArray
) => {
  return (
    itemIsArray && subsetArray.every((item) => supersetArray.includes(item))
  );
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
