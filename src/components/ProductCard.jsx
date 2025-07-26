import React, { useState } from 'react';

function ProductCard({ product }) {  
  // Convert AvailableSizes string to array safely
  const sizes = Array.isArray(product.AvailableSizes)
    ? product.AvailableSizes
    : product.AvailableSizes.split(',').map(s => s.trim());

  const colors = product.AvailableColors.split(',').map(c => c.trim());

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      <>
        {[...Array(full)].map((_, i) => (
          <i key={`full-${i}`} className="bi bi-star-fill text-warning"></i>
        ))}
        {half && <i className="bi bi-star-half text-warning"></i>}
        {[...Array(empty)].map((_, i) => (
          <i key={`empty-${i}`} className="bi bi-star text-warning"></i>
        ))}
      </>
    );
  };

  return (
    <div className="card container-fluid border-0 rounded-0 p-1 text-center">
      <div className="row g-2">
        <div className="col-12 bg-body-secondary  m-auto d-felx p-0" style={{aspectRatio:'4/5'}}>
          <img
            src={product.Image || '/assets/image.webp'}
            alt={product.Name}
            className="w-100 h-100"
            style={{objectFit:'cover'}}
          />
        </div>
        <div className="col-12">
          <div className="pt-2 text-start" style={{ fontSize: '14px' }}>
            <h5 className='m-0' style={{ fontSize: '14px' }}>{product.Name} | {product.Category}</h5>
            <div>
              <span className="fw-bold me-3">${product.Price}</span>
              <span className="fw-bold text-body-secondary text-decoration-line-through">${product.PriceBeforeSale}</span>
            </div>
            <div className="d-flex gap-1 pt-1">
              {colors.map((color, idx) => (
                <span
                  key={idx} title={color}
                  className="btn btn-sm border rounded-pill p-0"
                  style={{
                    width: '14px', height: '14px',
                    backgroundColor: color.toLowerCase()
                  }}
                />
              ))}
            </div>
            {/* {product.Rating && (
              <div className="">
                {renderStars(product.Rating)}
                <small className="text-muted ms-2">({product.RatingCount})</small>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductCard;

















{/* <div className="d-flex gap-2 my-1 flex-wrap justify-content-center">
              {sizes.map((size, idx) => (
                <button
                  key={idx} type="button"
                  className="btn btn-outline-dark btn-sm"
                  style={{ minWidth: '30px' }}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="d-flex gap-2 mt-2 justify-content-center">
              {colors.map((color, idx) => (
                <span
                  key={idx} title={color}
                  className="btn btn-sm rounded-pill"
                  style={{ 
                    width: '24px', height: '24px',
                    backgroundColor: color.toLowerCase() }}
                />
              ))}
            </div> */}