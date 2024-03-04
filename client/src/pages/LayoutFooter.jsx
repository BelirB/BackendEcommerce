import React from 'react'
import {
  BiLogoLinkedin,
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoGmail,
  BiLogoWhatsapp,
} from 'react-icons/bi';

const LayoutFooter = () => {
  return (
    <footer className="footer">
    <img src="/img/logo.png" alt="Logotipo" />
    <p className="title">MarkPlace</p>
    <p className="descrip">
    Bienvenidos a Armed Bruyne.
    </p>
    <div className="social-links">
      <a
        href="https://wa.me/5493454285636?text=Hola.%20Me%20gustaría%20contactarme%20contigo"
        target="_blank"
        rel="noreferrer"
      >
        <BiLogoWhatsapp />
      </a>
      <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
        <BiLogoFacebook />
      </a>
      <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
        <BiLogoInstagram />
      </a>
      <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
        <BiLogoLinkedin />
      </a>
      <a
        href="mailto:brunoblasco403@gmail.com"
        target="_blank"
        rel="noreferrer"
      >
        <BiLogoGmail />
      </a>
    </div>
    <div className="copyright">
      &copy; Copyright {new Date().getFullYear() + ' - '}
      <strong> @ArmedBruyne</strong>.
    </div>
  </footer>
  )
}

export default LayoutFooter