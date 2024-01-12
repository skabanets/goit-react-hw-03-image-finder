import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './imageGallery.module.css';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={s.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          content={image}
          openModal={openModal}
        />
      ))}
    </ul>
  );
};
