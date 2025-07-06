import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import products from '../data/products.json';

function Navbar() {
  const [showCategories, setShowCategories] = useState(false);

  const categoriesMap = new Map();
  products.forEach((product) => {
    if (!categoriesMap.has(product.Category)) {
      categoriesMap.set(product.Category, product.CategoryImage);
    }
  });
  const categories = Array.from(categoriesMap, ([name, image]) => ({ name, image }));

  // Handlers depending on device
  const onProductsClick = () => {
      setShowCategories(!showCategories);
  };
  const onMouseEnter = () => {
      setShowCategories(true);
  };
  const onMouseLeave = () => {
      setShowCategories(false);
  };

  return (
    <>
<nav className="navbar navbar-expand-md bg-body-tertiary shadow-sm sticky-top">
  <div className="container-fluid d-flex align-items-center justify-content-between">

    {/* Brand -------------------------------------------------------- */}
    <NavLink to="/" className="navbar-brand fw-bold">
      <img src="src/assets/logo.svg" alt="CozyKidy" width="170" />
    </NavLink>

    {/* Icons -------------------------------------- */}
    <div className="d-flex align-items-center me-md-2 order-md-3">
       <i 
          className="bi bi-search fs-5" 
          role="button" 
          data-bs-toggle="offcanvas" 
          data-bs-target="#offcanvasExample" 
          aria-controls="offcanvasExample"
       />
       <i className="bi bi-bag ms-2 ms-md-3 fs-5" role="button" />
       <i
          className="bi bi-list ms-2 fs-2 d-md-none"
          role="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
       />
    </div>

    {/* Collapsible nav links -------------------------------------- */}
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'nav-link active fw-bold' : 'nav-link'
            }
          >
            Home
          </NavLink>
        </li>

        <li className="nav-item mx-md-4 mx-0">
          <NavLink
            to="/new"
            className={({ isActive }) =>
              isActive ? 'nav-link active fw-bold' : 'nav-link'
            }
          >
            New
          </NavLink>
        </li>

        {/* Products hover / click trigger */}
        <li
          className="nav-item"
          onClick={onProductsClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{ position: 'relative' }}
        >
          <span className="nav-link" role='button'>Products</span>
        </li>

        <li className="nav-item mx-md-4 mx-0">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? 'nav-link active fw-bold' : 'nav-link'
            }
          >
            About
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? 'nav-link active fw-bold' : 'nav-link'
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>



<div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasExampleLabel">
      <img src="src/assets/logo.svg" alt="CozyKidz" width="200px" />
    </h5>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <NavLink to="/" end className="nav-link">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/new" className="nav-link">New</NavLink>
      </li>
      <li className="nav-item">
        <span className="nav-link" role="button" data-bs-toggle="collapse" data-bs-target="#collapseCategories" aria-expanded="false" aria-controls="collapseCategories">Products</span>
      </li>
      <li className="nav-item">
        <NavLink to="/about" className="nav-link">About</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/contact" className="nav-link">Contact</NavLink>
      </li>
    </ul>

    {/* 🟩 Categories in 2-column grid */}
    <div className="container mt-3 collapse" id="collapseCategories">
      <div className="row">
        {categories.map(({ name, image }) => (
          <div className="col-6 mb-4 d-flex justify-content-center" key={name}>
            <NavLink
              to={`/category/${name.toLowerCase()}`}
              style={{ textAlign: 'center', textDecoration: 'none', color: 'black', minWidth: '60px' }}
              className="category-item"
              onClick={() => setShowCategories(false)} 
            >
              <img
                src={image}
                alt={name}
                style={{ width: '70px', height: '90px', objectFit: 'cover', borderRadius: '10px' }}
              />
              <div style={{ marginTop: '0.5rem', fontWeight: '600' }}>{name}</div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  </div>
  <div className='py-3 bg-dark px-2'>
    <span className='text-white'>Welcome by CozyKidz</span>
    <i className='bi bi-cart2 text-white float-end me-2 fs-5'></i>
  </div>
</div>



      {showCategories && (
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{ position: 'absolute', top: '56px', left: 0, width: '100vw', height: '50vh', backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', padding: '1rem', zIndex: 1050, overflowX: 'auto' }}
        >
          {categories.map(({ name, image }) => (
            <NavLink
              to={`/category/${name.toLowerCase()}`}
              key={name}
              style={{ textAlign: 'center', textDecoration: 'none', color: 'black', minWidth: '100px' }}
              className="category-item"
              onClick={() => setShowCategories(false)} 
            >
              <img src={image} alt={name} style={{ width: '120px', height: '150px', objectFit: 'cover' }} />
              <div style={{ marginTop: '0.5rem', fontWeight: '600' }}>{name}</div>
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}

export default Navbar;
