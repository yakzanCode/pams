import React from 'react';

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
    <div className="card border-0 text-center mb-3" style={{ maxWidth: '540px' }}>
      <div className="row g-0">
        <div className="col-12">
          <img
            src={product.Image || '/src/assets/image.webp'}
            alt={product.Name}
            className="img-fluid rounded-start"
          />
        </div>
        <div className="col-12">
          <div className="card-body">
            <h5 className="card-title">{product.Name}</h5>
            <p className="card-text m-0">{product.Description}</p>
            <p className="card-text m-0">
              <small className="fw-bold">${product.Price}</small>
            </p>
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

            {product.Rating && (
              <div className="mt-1">
                {renderStars(product.Rating)}
                <small className="text-muted ms-2">({product.RatingCount})</small>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductCard;