import configData from "../config.json";

class ShopService {
    async createShop(shop) {
        try {
            const response = await fetch(configData.SERVER_URL + '/Shop/CreateShop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(shop),
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
}

export default new ShopService();