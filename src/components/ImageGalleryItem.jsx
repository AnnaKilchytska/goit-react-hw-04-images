import PropTypes from 'prop-types';

function ImageGalleryItem(props) {
  return (
    <li className="ImageGalleryItem" onClick={props.onClick}>
      <img
        src={props.url}
        alt={props.tags}
        className="ImageGalleryItem-image"
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
