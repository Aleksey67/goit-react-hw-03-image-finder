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
    prevQuery: null,
  };

  componentDidMount() {
    this.fetchPhotos();
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
    this.fetchPhotos(this.state.prevQuery, page);
  };

  fetchPhotos = (query, page = 1) => {
    if (query !== this.state.prevQuery) {
      this.setState({ photos: [] });
    }

    this.setState({ isLoading: true });
    this.setState({ prevQuery: query });

    if (query === undefined) {
      this.setState({ isLoading: false });
      return;
    }
    if (!page) {
      page = this.state.page;
    }
    photosAPI.searchPhotos(query, page)
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
        <SearchForm onSubmit={this.fetchPhotos} page={page} />
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
