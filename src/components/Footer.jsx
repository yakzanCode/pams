import React from 'react';

function Footer() {
  return (
    <footer className="bg-body-secondary text-center py-3 mt-auto">
      <small>&copy; {new Date().getFullYear()} BabyShop. All rights reserved.</small>
    </footer>
  );
}

export default Footer;
