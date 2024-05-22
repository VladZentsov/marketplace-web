// MyShopPage.js
import React, { useEffect, useState } from 'react';
import ProductCard from '../../productCard/ProductCard'; // Компонент карточки продукта
import ProductService from '../../../../services/ProductService';
import CreateProductForm from './CreateProductForm';
import { Link } from 'react-router-dom';
import './MyShopPage.css'

const MyShopPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const userProducts = await ProductService.getUserProducts(); // Получаем товары пользователя
      setProducts(userProducts);
    };

    fetchProducts();
  }, []);

  return (
    <div className="my-shop-page">
      <h2>My Shop</h2>
      <Link to="/create-product">
        <button className="styled-button">Create Product</button>
      </Link>
      <div className="product-list">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default MyShopPage;
