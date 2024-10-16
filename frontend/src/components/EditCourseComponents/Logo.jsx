import React from 'react';
import styles from './Navbar.module.css';  

const Logo = () => {
  return (
    <a href="/" className={styles.navbarLogo}>
      <picture>
        <source srcSet="/static/frontend/topbar_logo_small.svg" media="(max-width: 1024px)" />
        <img className={styles.navbarLogo} alt="SkillSphere" src="/static/frontend/topbar_logo.svg" />
      </picture>
    </a>
  );
};

export default Logo;
