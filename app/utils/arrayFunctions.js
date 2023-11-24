export const removeOrAddToArray = (item, array, func, steps) => {
    if(array.includes(item)){
        const newItem = array.filter(x => x !== item)
        func(() => newItem);
    }else{
        func([...array, item]);
    }
}