import { FC } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css';


const Footer: FC = () => {
  return (
    <footer className="footer" >
      <div className="footer__logo">
        <h2>My Market</h2>
      </div>
      
      <div className="footer__bottom">
        <div>
          © 2024 My Market. Todos los derechos reservados |{' '}
          <a href="/terminos" className="footer__link">
            Términos y condiciones
          </a>{' '}
          |{' '}
          <a href="/privacidad" className="footer__link">
            Privacidad
          </a>
        </div>
        
        <div className="footer__social">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social__icon"
          >
            <FaFacebookF />
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social__icon"
          >
            <FaTwitter />
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social__icon"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;