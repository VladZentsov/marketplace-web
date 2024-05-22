// CreateShopForm.js
import React, { useState } from 'react';
import ShopService from '../../../../services/ShopService';
import './CreateShopForm.css'

const CreateShopForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newShop = { name, description };

    try {
      await ShopService.createShop(newShop);
      alert('Магазин успешно создан!');
    } catch (error) {
      console.error('Ошибка при создании магазина:', error);
      alert('Ошибка при создании магазина. Попробуйте снова.');
    }
  };

  return (
    <div className="create-shop-form">
      <h2>Создать магазин</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Название магазина:</label>
          <input type="text" value={name} onChange={handleNameChange} required />
        </div>
        <div>
          <label>Описание:</label>
          <input type="text" value={description} onChange={handleDescriptionChange} required />
        </div>
        <button type="submit">Создать</button>
      </form>
    </div>
  );
};

export default CreateShopForm;
