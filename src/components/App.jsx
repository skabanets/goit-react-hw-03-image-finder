import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from 'services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Notification } from './Notification/Notification';
import { ToastContainer, toast } from 'react-toastify';
import s from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoadMore: false,
    isEmpty: false,

    isError: false,
    modalContent: null,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        const res = await getImages(query, page);
        const { hits: images, totalHits: totalImages } = res;

        if (!images.length) {
          this.setState({ isEmpty: true });
          toast.error(`No images found.`, { autoClose: 2000 });
          return;
        }

        toast.success(`We found ${totalImages} images`, { autoClose: 2000 });
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          isLoadMore: page < Math.ceil(totalImages / 40),
        }));
      } catch (error) {
        this.setState({ isError: true });
        toast.error(`${error.message}`, { autoClose: 2000 });
      }
    }
  }

  handleSubmit = query => {
    if (query) {
      this.setState({
        query,
        images: [],
        page: 1,
        modalContent: null,
        isLoadMore: false,
        isEmpty: false,
        isError: false,
      });
    }
  };

  handleClickImage = image => {
    this.setState({ modalContent: image });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isLoadMore, isEmpty, isError } = this.state;

    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleSubmit} />

        {isEmpty && (
          <Notification
            text="No images found for your request.
            Try to enter another query."
          />
        )}

        {isError && (
          <Notification
            text="Oops, something's wrong!
              Reload page or try again later."
          />
        )}

        {!isEmpty && (
          <ImageGallery images={images} openModal={this.handleClickImage} />
        )}

        {isLoadMore && <Button onClick={this.handleLoadMore} />}
        <ToastContainer />
      </div>
    );
  }
}
