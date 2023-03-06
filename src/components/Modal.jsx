import PropTypes from 'prop-types';
import { useEffect } from 'react';

function Modal({ image, onClose }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        console.log('escape pressed');
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={image} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  image: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
