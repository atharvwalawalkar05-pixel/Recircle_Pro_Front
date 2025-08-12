import React from 'react';

const Footer = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '20px', marginTop: '40px', borderTop: '1px solid #ccc' }}>
      <p>Copyright &copy; ReCircle {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;