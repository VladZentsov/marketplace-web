import configData from "../config.json";
import { jwtDecode } from 'jwt-decode'

class AuthService {

  
    setTokens(jwtToken, refreshToken) {
      localStorage.setItem('jwtToken', jwtToken);
      localStorage.setItem('refreshToken', refreshToken);
    }
  
    getJwtToken() {
      return localStorage.getItem('jwtToken');
    }
  
    getRefreshToken() {
      return localStorage.getItem('refreshToken');
    }
  
    logout() {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('refreshToken');
    }
  
    isLoggedIn() {
      return !!this.getJwtToken();
    }
    getUser(){
      const token = this.getJwtToken();
      if(!token)
        return;
      console.log(token)
      const user = jwtDecode(token);
      console.log(user)
    }
  }
  
  export default new AuthService();