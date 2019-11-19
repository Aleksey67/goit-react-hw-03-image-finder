import React, { Component } from "react";
import styles from "./SearchForm.module.css";
import PropTypes from "prop-types";

class SearchForm extends Component {
  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(e.target.input.value);
  };

  render() {
    return (
      <form className={styles.search_form} onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="input"
          autoComplete="off"
          placeholder="Search images..."
        />
      </form>
    );
  }
}

SearchForm.propTypes = {
  page: PropTypes.number
};

export default SearchForm;
