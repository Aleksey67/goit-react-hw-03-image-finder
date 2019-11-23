import React, { Component } from "react";
import styles from "./SearchForm.module.css";
import PropTypes from "prop-types";

class SearchForm extends Component {
  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(e.target.input.value);
  };

  render() {
    const query = this.props.query;
    return (
      <form className={styles.search_form} onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="input"
          value={query}
          autoComplete="off"
          placeholder="Search images..."
        />
      </form>
    );
  }
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
