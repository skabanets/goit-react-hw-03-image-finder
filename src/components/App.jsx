import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from 'services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    modalContent: null,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      const res = await getImages(query, page);
      const { hits: images } = res;
      this.setState({ images });
    }
  }

  handleSubmit = query => {
    this.setState({ query });
  };

  handleClickImage = image => {
    this.setState({ modalContent: image });
  };

  render() {
    const { images } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} openModal={this.handleClickImage} />
      </>
    );
  }
}
