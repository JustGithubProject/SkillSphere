import React from 'react';
import styles from './Navbar.module.css';  

const NavLinks = () => {
  return (
    <ul className={styles.navbarLinks}>
      <li className={styles.navbarMenuItem}><a href="/link1">Link 1</a></li>
      <li className={styles.navbarMenuItem}><a href="/link2">Link 2</a></li>
      <li className={styles.navbarMenuItem}><a href="/link3">Link 3</a></li>
    </ul>
  );
};

export default NavLinks;
