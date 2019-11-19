import React, { Component, createRef } from 'react';
import PhotoCard from '../PhotoCard/PhotoCard';
import styles from './Gallery.module.css';
import PropTypes from 'prop-types';

class Gallery extends Component {
  state = {};

  listRef = createRef();

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.items !== this.props.items) {
      const listRef = this.listRef.current;

      window.scrollTo(0, listRef.scrollHeight);
    }
  }

  render() {
    const { onChangePage, onOpenModal, items } = this.props;

    return (
      <>
        <ul ref={this.listRef} className={styles.gallery}>
          {items.map(photo => (
            <li key={photo.id} className={styles.gallery_item}>
              <PhotoCard {...photo} onClick={onOpenModal} />
            </li>
          ))}
        </ul>
        <button className={styles.button} onClick={onChangePage}>
          Load more
        </button>
      </>
    );
  }
}

Gallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Gallery;
