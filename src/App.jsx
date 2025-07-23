import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductList from './pages/ProductList';
import ErrorPage from './pages/error';
import PromoBar from './components/Promobar';
import SplashScreen from './pages/SplashScreen';


function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Show splash screen for 5 seconds, then hide
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div>
        <PromoBar />
        <Navbar />
        <main>
          <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<ProductList />}>
              <Route path=":category" element={<ProductList />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>

      {/* Always render SplashScreen, but hide after 6 seconds */}
      {/* {showSplash && <SplashScreen />} */}
    </>

  );
}

export default App;
