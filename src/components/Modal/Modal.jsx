import React, { Component, createRef } from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  backDropRef = createRef();

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    if (e.code !== 'Escape') return;
    this.props.onClose();
  };

  handelBackdropClick = e => {
    const { current } = this.backDropRef;

    if (current && e.target !== current) return;

    this.props.onClose();
  };

  render() {
    const { url } = this.props;
    return (
      <div
        className={styles.overlay}
        ref={this.backDropRef}
        onClick={this.handelBackdropClick}
      >
        <div className={styles.modal}>
          <img src={url} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  url: PropTypes.string,
};

export default Modal;
