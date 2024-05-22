import React, { useEffect, useState, useContext } from 'react';
import './ProductCard.css'

const ProductCard = ({ product }) => {
    return (
      <div className="product-card">
        <img src={product.imageUrl} alt={product.name} />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <button>Add to Cart</button>
        <button>View details</button>
      </div>
    );
  };

export default ProductCard;
