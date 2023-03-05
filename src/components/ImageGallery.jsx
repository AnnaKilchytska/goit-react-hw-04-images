import PropTypes from 'prop-types';

import { useState } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import Modal from './Modal';

function ImageGallery({ images }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  const handleModalClick = url => {
    setModalOpen(!modalOpen);
    setLargeImageURL(url);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      {modalOpen === true && (
        <Modal image={largeImageURL} onClose={handleModalClose} />
      )}
      <ul className="ImageGallery">
        {images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              url={image.webformatURL}
              alt={image.tags}
              onClick={() => handleModalClick(image.largeImageURL)}
            />
          );
        })}
      </ul>
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageGallery;
