import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import ProductCard from '../components/ProductCard.jsx';
import { getUniqueCategories } from '../utils/getCategories';
import products from '../data/products.json';


const sliderSettings = {
  className: 'center',
  centerMode: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  centerPadding: '60px',
  arrows: true,
  responsive: [
    {
      breakpoint: 1400, // Large screens
      settings: {
        slidesToShow: 5,
        centerPadding: '60px',
      },
    },
    {
      breakpoint: 1200, // Medium desktops
      settings: {
        slidesToShow: 3,
        centerPadding: '120px',
      },
    },
    {
      breakpoint: 900, // Tablets & smaller laptops
      settings: {
        slidesToShow: 3,
        centerPadding: '30px',
      },
    },
    {
      breakpoint: 770, // Landscape phones / tablets
      settings: {
        slidesToShow: 1,
        centerPadding: '200px',
      },
    },
    {
      breakpoint: 670, // Smaller tablets & large phones
      settings: {
        slidesToShow: 1,
        centerPadding: '150px',
      },
    },
    {
      breakpoint: 576, // Most phones
      settings: {
        slidesToShow: 1,
        centerPadding: '100px',
      },
    },
  ],
};



const ProductList = () => {
  // Grab the category segment from `/category/:category`
  const { category } = useParams();          // undefined on /, defined on /category/…
  const allCategories = getUniqueCategories(products);
  const location = useLocation();


  // Exclude current category if on a category page
  const filteredCategories = category
    ? allCategories.filter(
      (c) => c.name.toLowerCase() !== category.toLowerCase()
    )
    : allCategories;


  // Normalise both sides to lower‑case for comparison
  const filteredProducts = category
    ? products.filter(
      (p) => p.Category.toLowerCase() === category.toLowerCase()
    )
    : products; // no param → show everything


  // Convert pathname to readable format: "/category/clothing" → "Home / Category / Clothing"
  const pathSegments = location.pathname
    .split('/')
    .filter((seg) => seg) // Remove empty strings
    .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1)); // Capitalize

  const breadcrumbText = ['Home', ...pathSegments].join(' / ');

  return (
    <div className="container-fluid my-4">
      <p className="text-muted mb-1">{breadcrumbText}</p>

      <h2 className="mb-4 text-start">
        {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}`
          : 'All Products'}
      </h2>

      <div className="row p-1 mb-2">
        <span className='col-6'>
          <button className='btn btn-outline-dark rounded-0 py-1'>
            <svg className="icon icon-filter w1" strokeWidth="var(--icon-stroke-width)" stroke="currentColor" width="20" height="10" viewBox="0 0 20 10" fill="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.75 2.5H16.875M8.75 2.5C8.75 2.83152 8.6183 3.14946 8.38388 3.38388C8.14946 3.6183 7.83152 3.75 7.5 3.75C7.16848 3.75 6.85054 3.6183 6.61612 3.38388C6.3817 3.14946 6.25 2.83152 6.25 2.5M8.75 2.5C8.75 2.16848 8.6183 1.85054 8.38388 1.61612C8.14946 1.3817 7.83152 1.25 7.5 1.25C7.16848 1.25 6.85054 1.3817 6.61612 1.61612C6.3817 1.85054 6.25 2.16848 6.25 2.5M6.25 2.5H3.125M13.75 7.5H16.875M13.75 7.5C13.75 7.83152 13.6183 8.14946 13.3839 8.38388C13.1495 8.6183 12.8315 8.75 12.5 8.75C12.1685 8.75 11.8505 8.6183 11.6161 8.38388C11.3817 8.14946 11.25 7.83152 11.25 7.5M13.75 7.5C13.75 7.16848 13.6183 6.85054 13.3839 6.61612C13.1495 6.3817 12.8315 6.25 12.5 6.25C12.1685 6.25 11.8505 6.3817 11.6161 6.61612C11.3817 6.85054 11.25 7.16848 11.25 7.5M11.25 7.5H3.125" vectorEffect="non-scaling-stroke" strokeLinejoin="var(--icon-stroke-linejoin)" strokeLinecap="var(--icon-stroke-linecap)"></path>
            </svg> Filter
          </button>
        </span>
        <span className='col-6 text-end fw-semibold'>
          ( {filteredProducts.length} product
          {filteredProducts.length !== 1 ? 's' : ''} )
        </span>
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

      <h3 className="mt-5 mb-3 text-center">Explore Other Categories</h3>
      <Slider {...sliderSettings}>
        {filteredCategories.map((cat, idx) => (
          <div key={idx} className="text-center">
            <div className="category-slide mx-2 rounded-3 d-flex flex-column" >
              <img
                src={cat.gif}
                alt={cat.name}
                className="rounded-3 w-100"
                style={{ objectFit: 'cover' }}
              />
              <div className="card mt-auto w-100" >
                <div className="row g-0 p-1 h-100">
                  <div className="col-3 h-100">
                    <img src={cat.image} style={{ objectFit: 'cover' }} className=" w-75 h-100 rounded-start" alt="..." />
                  </div>
                  <div className="col-9 h-100">
                    <div className="fw-bold h-100 text-start" style={{ fontSize: '10px' }}>
                      <p>{cat.name}</p>
                      <p>14$</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </Slider>


    </div>
  );



};

export default ProductList;
