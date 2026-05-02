import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link to="/" className={styles.logo}>
          Dev<span>Portfolio</span>
        </Link>

        <div className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
          <a href="/#about" className={styles.navLink} onClick={() => setIsOpen(false)}>About</a>
          <a href="/#services" className={styles.navLink} onClick={() => setIsOpen(false)}>Services</a>
          <a href="/#projects" className={styles.navLink} onClick={() => setIsOpen(false)}>Work</a>
          <a href="/#process" className={styles.navLink} onClick={() => setIsOpen(false)}>Process</a>
          <Link to="/faq" className={styles.navLink} onClick={() => setIsOpen(false)}>FAQ</Link>
          <Link to="/contact" className="btn btn-primary" onClick={() => setIsOpen(false)}>Let's Talk</Link>
        </div>

        <button className={styles.mobileMenuBtn} onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
