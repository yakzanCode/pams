import React from 'react';

function PromoBar() {
    return (
        <div className="alert alert-dismissible fade show bg-warning-subtle text-dark py-1 m-0">
            <div
                id="promoCarousel"
                className="carousel slide"
                data-bs-ride="carousel"
            >
                <div className="carousel-inner text-center">
                    <div className="carousel-item active">
                        🔥 Free Shipping on orders over $50!
                    </div>
                    <div className="carousel-item">
                        🎁 Buy 2 Get 1 Free on selected toys!
                    </div>
                    <div className="carousel-item">
                        🚚 Next Day Delivery Available!
                    </div>
                </div>
            </div>

            <button
                type="button"
                className="btn-close mt-1 p-2 me-1"
                style={{ fontSize: '12px' }}
                data-bs-dismiss="alert"
                aria-label="Close"
            ></button>

        </div>
    );
}


export default PromoBar;
