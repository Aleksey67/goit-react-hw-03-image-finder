import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <h1 className={styles.loader}>
      <span>Loading...</span>
    </h1>
  );
};

export default Loader;
