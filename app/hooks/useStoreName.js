const useStoreName = () => {
    const removeStoreName = () => {
        typeof window !== 'undefined' && localStorage.removeItem("storeName")
    }


    const saveStoreName = (store) => {
        typeof window !== 'undefined' && localStorage.setItem("storeName", store)
    }

    const storeName =
    typeof window !== 'undefined' && localStorage.getItem('storeName')


    return { storeName, removeStoreName, saveStoreName }
}

export default useStoreName;