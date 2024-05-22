import React, { useState, useEffect } from 'react';
import AuthService from '../../services/AuthService';
import ProductCard from './productCard/ProductCard';
import ProductService from '../../services/ProductService';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const topProducts = await ProductService.getTopProducts(3);
        setProducts(topProducts);
      } catch (error) {
        console.error('Ошибка загрузки продуктов:', error.message);
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <div>
      <h2>Вход</h2>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
