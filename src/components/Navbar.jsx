// Navbar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from './Sidebar';
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

  const onProductsClick = () => setShowCategories(!showCategories);
  const onMouseEnter = () => setShowCategories(true);
  const onMouseLeave = () => setShowCategories(false);

  return (
    <>
      <nav className="navbar navbar-expand-md bg-body-secondary shadow-sm sticky-top">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <NavLink to="/" className="navbar-brand fw-bold">
            <img src="/assets/logo.svg" alt="CozyKidy" width="170" />
          </NavLink>

          <div className="d-flex align-items-center me-md-2 order-md-3">
            <button
              style={{ width: '230px', fontSize: '16px', borderRadius: '16px', border: '1px solid white' }}
              className="text-start btn p-2 d-none d-md-block"
              type="search"
            >
              <i className="bi bi-search mx-2"></i>
              <span>Search</span>
            </button>

            <i className="bi bi-search me-1 fs-6 d-block d-md-none"
               role="button"
               data-bs-toggle="offcanvas"
               data-bs-target="#offcanvasExample"
               aria-controls="offcanvasExample" 
            />
            <span className="ms-2">Bag ( 0 )</span>
            <i className="bi bi-list ms-2 fs-2 d-md-none"
               role="button"
               data-bs-toggle="offcanvas"
               data-bs-target="#offcanvasExample"
               aria-controls="offcanvasExample"
            />
          </div>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active fw-bold' : 'nav-link'}>
                  Home
                </NavLink>
              </li>

              <li className="nav-item mx-md-4 mx-0">
                <NavLink to="/new" className={({ isActive }) => isActive ? 'nav-link active fw-bold' : 'nav-link'}>
                  New
                </NavLink>
              </li>

              <li
                className="nav-item"
                onClick={onProductsClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                style={{ position: 'relative' }}
              >
                <span className="nav-link" role="button">Products</span>
              </li>

              <li className="nav-item mx-md-4 mx-0">
                <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active fw-bold' : 'nav-link'}>
                  About
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active fw-bold' : 'nav-link'}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
           className={`category-dropdown bg-body-secondary ${showCategories ? 'show' : ''}`}>
        {categories.map(({ name, image }) => (
          <NavLink
            to={`/category/${name.toLowerCase()}`}
            key={name}
            className="category-item"
            onClick={() => setShowCategories(false)}
            style={{
              textAlign: 'center',
              textDecoration: 'none',
              color: 'black',
              minWidth: '100px',
            }}
          >
            <img src={image} alt={name} style={{ width: '120px', height: '150px', objectFit: 'cover' }} />
            <div style={{ marginTop: '0.5rem', fontWeight: '600' }}>{name}</div>
          </NavLink>
        ))}
      </div>

      {/* Inject Offcanvas Sidebar */}
      <Sidebar />
    </>
  );
}

export default Navbar;
