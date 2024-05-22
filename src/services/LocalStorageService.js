class LocalStorageService {
    saveItemToLocalStorage = (key, userModel) => {
        const userModelStr = JSON.stringify(userModel);
        localStorage.setItem(key, userModelStr);
      };
  
    getItemFromLocalStorage = (key) => {
    const userModelStr = localStorage.getItem(key);
    if (!userModelStr) {
        return null;
    }
    return JSON.parse(userModelStr);
    };

    removeItemFromLocalStorage = (key) =>{
    localStorage.removeItem(key);
    }
}

export default new LocalStorageService();