import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import Carousel from '../components/Carousel.jsx';
import products from '../data/products.json';
import { getUniqueCategories } from '../utils/getCategories';

const ProductList = () => {
  const { category } = useParams();
  const location = useLocation();
  const allCategories = getUniqueCategories(products);

  const [selectedCategories, setSelectedCategories] = useState(
    category ? [category] : []
  );
  const [selectedAges, setSelectedAges] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter products based on category and age
  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategories.length > 0
        ? selectedCategories.includes(product.Category)
        : true;

    const ageMatch =
      selectedAges.length > 0
        ? selectedAges.includes(product.AgeRange)
        : true;

    return categoryMatch && ageMatch;
  });

  // Sort filtered products
  let sortedProducts = [...filteredProducts]; // or products array

  sortedProducts.sort((a, b) => {
    if (sortOption === 'price-low-high') {
      return parseFloat(a.Price) - parseFloat(b.Price);
    }
    if (sortOption === 'price-high-low') {
      return parseFloat(b.Price) - parseFloat(a.Price);
    }
    if (sortOption === 'rating-high-low') {
      return (b.Rating ?? 0) - (a.Rating ?? 0);
    }
    return 0;
  });


  // Get unique age ranges
  const ages = [...new Set(products.map((p) => p.AgeRange))];

  const breadcrumbText = ['Home', ...location.pathname
    .split('/')
    .filter(Boolean)
    .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1))
  ].join(' / ');

  const filteredCategories = allCategories.filter(
    (c) => !category || c.name.toLowerCase() !== category.toLowerCase()
  );

  return (
    <div className="container-fluid mb-4 px-2">

      {/* Breadcrumb */}
      <p className="text-muted m-0 py-2">{breadcrumbText}</p>

      {/* Mobile Header Image */}
      <div className="row">
        <div className='position-relative d-block d-md-none px-0 mx-0' style={{ height: '30vh' }}>
          <img className='position-absolute w-100 h-100 p-0' style={{ objectFit: 'cover' }}
            src="https://static.vecteezy.com/system/resources/thumbnails/066/276/866/small/the-joyful-moment-of-children-lying-together-on-the-grass-photo.jpeg"
            alt="category" />
          <div className='position-absolute d-flex w-100 h-100' style={{ background: 'rgba(0, 0, 0, 0.4)' }}>
            <h2 className="text-light m-auto">
              {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products'}
            </h2>
          </div>
        </div>
      </div>


      {/* Page Title */}
      <h2 className="text-start d-none d-md-block my-2">
        {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products'}
      </h2>

      {/* Filter and Sort Row */}
      <div className="row pt-3 align-items-center">
        <div className='col-6'>
          <button onClick={() => setShowFilters(!showFilters)} className='btn btn-outline-dark rounded-0 py-1'>
            <svg className="icon icon-filter w1" strokeWidth="var(--icon-stroke-width)" stroke="currentColor" width="20" height="10" viewBox="0 0 20 10" fill="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.75 2.5H16.875M8.75 2.5C8.75 2.83152 8.6183 3.14946 8.38388 3.38388C8.14946 3.6183 7.83152 3.75 7.5 3.75C7.16848 3.75 6.85054 3.6183 6.61612 3.38388C6.3817 3.14946 6.25 2.83152 6.25 2.5M8.75 2.5C8.75 2.16848 8.6183 1.85054 8.38388 1.61612C8.14946 1.3817 7.83152 1.25 7.5 1.25C7.16848 1.25 6.85054 1.3817 6.61612 1.61612C6.3817 1.85054 6.25 2.16848 6.25 2.5M6.25 2.5H3.125M13.75 7.5H16.875M13.75 7.5C13.75 7.83152 13.6183 8.14946 13.3839 8.38388C13.1495 8.6183 12.8315 8.75 12.5 8.75C12.1685 8.75 11.8505 8.6183 11.6161 8.38388C11.3817 8.14946 11.25 7.83152 11.25 7.5M13.75 7.5C13.75 7.16848 13.6183 6.85054 13.3839 6.61612C13.1495 6.3817 12.8315 6.25 12.5 6.25C12.1685 6.25 11.8505 6.3817 11.6161 6.61612C11.3817 6.85054 11.25 7.16848 11.25 7.5M11.25 7.5H3.125" vectorEffect="non-scaling-stroke" strokeLinejoin="var(--icon-stroke-linejoin)" strokeLinecap="var(--icon-stroke-linecap)"></path>
            </svg> Filter
          </button>
        </div>
        <div className='col-6 text-end fw-semibold'>
          ({filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''})
        </div>
      </div>

      {/* Filters and Products */}
      <div className="container-fluid p-0">
      <div className="row">
        {/* Filters */}
        {showFilters && (
          <div className="col-4 col-md-3 col-lg-2">
            {/* Age Filter */}
            <div className="mt-2 pt-2">
              <h6>Age:</h6>
              {ages.map((age) => (
                <div key={age} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={selectedAges.includes(age)}
                    onChange={() => {
                      setSelectedAges((prev) =>
                        prev.includes(age)
                          ? prev.filter((a) => a !== age)
                          : [...prev, age]
                      );
                    }}
                    id={`age-${age}`}
                  />
                  <label className="form-check-label" htmlFor={`age-${age}`}>{age}</label>
                </div>
              ))}
            </div>

            {/* Category Filter */}
            <div className="mt-2 border-top pt-2">
              <h6>Category:</h6>
              {allCategories.map((cat) => (
                <div key={cat.name} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={selectedCategories.includes(cat.name)}
                    onChange={() => {
                      setSelectedCategories((prev) =>
                        prev.includes(cat.name)
                          ? prev.filter((c) => c !== cat.name)
                          : [...prev, cat.name]
                      );
                    }}
                    id={`cat-${cat.name}`}
                  />
                  <label className="form-check-label" htmlFor={`cat-${cat.name}`}>
                    {cat.name}
                  </label>
                </div>
              ))}
            </div>

            {/* Sort Options */}
            <div className="mt-3 border-top pt-2">
              <h6>Sort By:</h6>
              <select
                className="form-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Default</option>
                <option value="price-low-high">Highest Price</option>
                <option value="price-high-low">Lowest Price</option>
                <option value="rating-high-low">Top Rated</option>
              </select>
            </div>
          </div>
        )}

        {/* Product List */}
        <div className={`row g-3 mx-auto my-0 ${showFilters ? 'col-8 col-md-9 col-lg-10' : 'col-12'}`}>
          {sortedProducts.length === 0 ? (
            <p className="text-center text-muted">No products found.</p>
          ) : (
            sortedProducts.map((product, idx) => (
              <div key={idx} className={`mb-4 ${showFilters ? 'col-6 ' : 'col-6 col-sm-4 col-xl-3'} col-md-3 `}>
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>
      </div>


      {/* Explore Other Categories */}
      <h3 className="mt-5 mb-3 text-center">Explore Other Categories</h3>
      <Carousel categories={filteredCategories} />
    </div>
  );
};

export default ProductList;
