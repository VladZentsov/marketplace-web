import configData from "../config.json";

class UserService {

    async getUserData(){
        const isLoggedIn = this.getItemFromLocalStorage('isLoggedIn');
        if (!isLoggedIn){
          return;
        }
        const user = this.getItemFromLocalStorage("user")
        if(user){
          console.log('user'+user)
          return user;
        }

        try {
            const response = await fetch(configData.SERVER_URL+'/GetUserInfo', {
              method: 'Get',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data)

                this.saveItemToLocalStorage("user", data)
              return response;
            } else {
              throw new Error('Ошибка входа');
            }
          } catch (error) {
            console.error('Ошибка входа:', error.message);
            return false;
          }
    }

    getUserDataFromUserData(){
      const user = this.getItemFromLocalStorage("user")
        if(user){
          console.log('user'+user)
          return user;
        }
    }

    

    register(login, password){

    }




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

export default new UserService();