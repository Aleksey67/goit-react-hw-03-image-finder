import React, { Component } from "react";
import styles from "./PhotoCard.module.css";
import PropTypes from "prop-types";
import "material-design-icons-iconfont";

class PhotoCard extends Component {
  takeWiderImage = () => {
    this.props.onClick(this.props.largeImageURL);
  };

  render() {
    const { webformatURL, likes, views, comments, downloads } = this.props;
    return (
      <div className={styles.photo_card}>
        <img src={webformatURL} alt="" />

        <div className={styles.stats}>
          <p className={styles.stats_item}>
            <i className="material-icons">thumb_up</i>
            {likes}
          </p>
          <p className={styles.stats_item}>
            <i className="material-icons">visibility</i>
            {views}
          </p>
          <p className={styles.stats_item}>
            <i className="material-icons">comment</i>
            {comments}
          </p>
          <p className={styles.stats_item}>
            <i className="material-icons">cloud_download</i>
            {downloads}
          </p>
        </div>

        <button
          type="button"
          onClick={this.takeWiderImage}
          className={styles.fullscreen_button}
        >
          <i className="material-icons">zoom_out_map</i>
        </button>
      </div>
    );
  }
}

PhotoCard.propTypes = {
  webformatURL: PropTypes.string,
  likes: PropTypes.number,
  views: PropTypes.number,
  comments: PropTypes.number,
  downloads: PropTypes.number
};

export default PhotoCard;
