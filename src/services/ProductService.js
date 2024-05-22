import configData from "../config.json";
class ProductService{
    async getTopProducts(count){
        try {
            const response = await fetch(configData.SERVER_URL+'/Product/GetTopProducts/'+count, {
              method: 'Get',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
              return data;
            } else {
              throw new Error('Ошибка входа');
            }
          } catch (error) {
            console.error('Ошибка входа:', error.message);
            return [];
          }
    }

    async getUserProducts(){
        return await this.getResponse('/Product/GetUserProducts') 
    }

    async createProduct(product){
        try {
          const response = await fetch(configData.SERVER_URL + '/Product/CreateProduct', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify(product),
          });

          if (response.ok) {
              return true;
          }
          else {
              throw new Error('Ошибка входа');
          }
      }
      catch(error) {
          console.log('Ошибка входа:', error.message);
          return false;
      }
    }

    async getResponse(url){
        try {
            const response = await fetch(configData.SERVER_URL+url, {
              method: 'Get',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
              return data;
            } else {
              throw new Error('Ошибка входа');
            }
          } catch (error) {
                console.error('Ошибка входа:', error.message);
            return [];
          }
    }
}

export default new ProductService();