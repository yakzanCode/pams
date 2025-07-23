import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

    return (
        <section
            className="position-relative vh-100"
            style={{
                backgroundImage: "url('/assets/hero.webp')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="position-absolute top-0 bottom-0 end-0 p-4 text-end">
                <h2 className="text-white fw-bold mb-3">New Arrivals</h2>
                <div className="d-flex flex-column align-items-end gap-2">
                    <button onClick={() => navigate('/products')} className="btn btn-light btn-sm">
                        Shop Products
                    </button>
                    <button onClick={() => navigate('/products')} className="btn btn-outline-light btn-sm">
                        View All Products
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Home;
