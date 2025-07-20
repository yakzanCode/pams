import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import products from '../data/products.json';

const ProductList = () => {
  // Grab the category segment from `/category/:category`
  const { category } = useParams();          // undefined on /, defined on /category/…
  
  // Normalise both sides to lower‑case for comparison
  const filteredProducts = category
    ? products.filter(
        (p) => p.Category.toLowerCase() === category.toLowerCase()
      )
    : products;                              // no param → show everything

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">
        {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}`
                  : 'Our Products'}
      </h2>

      <div className="row">
        <span className=''><i className='bi bi-filter'></i>filter</span>
        <span className=''></span>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-muted">
          No products found in this category.
        </p>
      ) : (
        <div className="row">
          {filteredProducts.map((product, idx) => (
            <div key={idx} className="col-6 col-md-4 col-lg-3 mb-4">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
