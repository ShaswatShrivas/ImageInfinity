import React from 'react';

const ViewImage = ({ image, onClose }) => {

  if (!image) return null;

  return (
    <div className="view-image">
      <div className="image-view-content">
        <span className="close-btn" onClick={onClose}>❌</span>
        <img src={image.download_url} alt={`Image by ${image.author}`} />
        <h2>Author: {image.author}</h2>
        <p>ID: {image.id}</p>
        <p>Width: {image.width}px</p>
        <p>Height: {image.height}px</p>
        <p>URL: <a href={image.url} target="_blank" rel="noopener noreferrer">{image.url}</a></p>
      </div>
    </div>
  );
};

export default ViewImage;
