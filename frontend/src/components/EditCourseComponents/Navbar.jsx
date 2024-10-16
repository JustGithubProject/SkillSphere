import React from 'react';
import Logo from './Logo';
import NavLinks from './NavLinks';
import styles from './Navbar.module.css';  

const Navbar = ( {course_id }) => {
  return (
    <nav id="main-navbar" className={styles.navbar} aria-label="Общая навигация по сайту">
      <Logo />
      <NavLinks />
    </nav>
  );
};

export default Navbar;
