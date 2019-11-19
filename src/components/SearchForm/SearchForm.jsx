import React, { Component } from "react";
import styles from "./SearchForm.module.css";
import PropTypes from "prop-types";

class SearchForm extends Component {
  state = { query: "" };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.page !== this.props.page) {
      this.props.onSubmit(this.state.query, this.props.page);
      this.setState({ query: `${this.state.query}` });
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.query, 1);
  };

  render() {
    const { query } = this.state;
    return (
      <form className={styles.search_form} onSubmit={this.handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          placeholder="Search images..."
          value={query}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

SearchForm.propTypes = {
  page: PropTypes.number
};

export default SearchForm;
