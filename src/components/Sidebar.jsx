import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../data/products.json';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleCollapse = () => setIsOpen(!isOpen);

  const categoriesMap = new Map();
  products.forEach((product) => {
    if (!categoriesMap.has(product.Category)) {
      categoriesMap.set(product.Category, product.CategoryImage);
    }
  });

  const categories = Array.from(categoriesMap, ([name, image]) => ({ name, image }));

  return (
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div className="offcanvas-header">
        <p className="offcanvas-title mx-auto mt-4" id="offcanvasExampleLabel">
          <img src="src/assets/logo.svg" alt="CozyKidz" width="200px"/>
        </p>
        <button type="button" className="btn-close position-absolute top-0 end-0 m-1" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>

      <div className="offcanvas-body p-4">
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        </form>
        <ul className="navbar-nav mx-auto mt-3 mb-lg-0">
          <li className="nav-item">
            <span className="nav-link" role="button" onClick={() => navigate('/')} data-bs-dismiss="offcanvas">Home</span>
          </li>
          <li className="nav-item">
            <span className="nav-link" role="button" onClick={() => navigate('/new')} data-bs-dismiss="offcanvas">New</span>
          </li>
          <li className="nav-item d-flex">
            <span className="nav-link" role="button" onClick={() => navigate('/products')} data-bs-dismiss="offcanvas">Products</span>
            <i
              className={`bi ${isOpen ? 'bi-dash' : 'bi-plus'} fs-4 ms-auto mt-1`}
              role="button"
              onClick={toggleCollapse}
              data-bs-toggle="collapse"
              data-bs-target="#collapseCategories"
              aria-expanded={isOpen}
              aria-controls="collapseCategories"
            ></i>
          </li>

          <div className="container mt-3 collapse" id="collapseCategories">
            <div className="row">
              {categories.map(({ name, image }) => (
                <div className="col mb-4 d-flex justify-content-center" key={name}>
                  <span
                    className="category-item text-center"
                    role="button"
                    onClick={() => navigate(`/products/${name.toLowerCase()}`)}
                    data-bs-dismiss="offcanvas"
                  >
                    <img
                      src={image}
                      alt={name}
                      className="w-100 h-75 rounded object-fit-cover"
                    />
                    <div className='mt-1 fw-semibold'>{name}</div>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <li className="nav-item">
            <span className="nav-link" role="button" onClick={() => navigate('/about')} data-bs-dismiss="offcanvas">About</span>
          </li>
          <li className="nav-item">
            <span className="nav-link" role="button" onClick={() => navigate('/contact')} data-bs-dismiss="offcanvas">Contact</span>
          </li>
        </ul>
      </div>

      <div className='py-3 px-4 fs-3 d-flex justify-content-between'>
        <i className='bi bi-instagram text-danger'></i>
        <i className='bi bi-whatsapp text-success'></i>
        <i className='bi bi-facebook text-primary'></i>
        <i className='bi bi-cart2'></i>
      </div>
    </div>
  );
}

export default Sidebar;
