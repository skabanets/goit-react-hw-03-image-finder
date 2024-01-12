import React from 'react';
import s from './imageGalleryItem.module.css';

export const ImageGalleryItem = ({ content, openModal }) => {
  const { webformatURL, largeImageURL } = content;
  return (
    <li className={s.ImageGalleryItem} onClick={() => openModal(largeImageURL)}>
      <img src={webformatURL} alt="" className={s.ImageGalleryItemImage} />
    </li>
  );
};
