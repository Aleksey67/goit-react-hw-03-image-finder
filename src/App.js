import React, { Component } from 'react';
import SearchForm from './components/SearchForm/SearchForm';
import Gallery from './components/Gallery/Gallery';
import Loader from './components/Loader/Loader';
import ErrorNotification from './components/ErrorNotification/errorNotification';
import * as photosAPI from './services/photos-api';
import Modal from './components/Modal/Modal';
import './App.module.css';

class App extends Component {
  state = {
    photos: [],
    isLoading: false,
    error: null,
    modalUrl: '',
    isOpenModal: false,
    page: 1,
    query: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page || prevState.query !== this.state.query) {
      this.fetchPhotos();
    }
  }

  onOpenModal = url => {
    this.setState({ modalUrl: url, isOpenModal: true });
  };

  closeModal = () => {
    this.setState({ isOpenModal: false });
  };

  onChangePage = () => {
    const page = this.state.page + 1;
    this.setState({ page });
  };

  onSubmitQuery(query) {
    this.setState({
      query,
      page: 1,
      photos: [],
    });
  }

  fetchPhotos = () => {
    if (!this.state.query) return;

    this.setState({ isLoading: true });

    photosAPI.searchPhotos(this.state.query, this.state.page)
      .then(({ data }) =>
        this.setState(state => ({
          photos: [...state.photos, ...data.hits],
        })),
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { photos, isLoading, error, page } = this.state;
    return (
      <div>
        {this.state.isOpenModal && (
          <Modal url={this.state.modalUrl} onClose={this.closeModal} />
        )}
        <SearchForm onSubmit={e => this.onSubmitQuery(e)} page={page} />
        {error && <ErrorNotification text={error.message} />}
        {isLoading && <Loader />}
        {photos.length > 0 && (
          <Gallery
            items={photos}
            onOpenModal={this.onOpenModal}
            onChangePage={this.onChangePage}
          />
        )}
      </div>
    );
  }
}

export default App;
