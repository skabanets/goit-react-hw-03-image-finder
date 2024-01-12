import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './imageGallery.module.css';
import { nanoid } from 'nanoid';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={s.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={nanoid()}
          content={image}
          openModal={openModal}
        />
      ))}
    </ul>
  );
};
