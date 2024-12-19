import React, { useState } from 'react';
import ViewImage from './ViewImage';

const ImageCard = ({ image }) => {
  const { author, download_url } = image;
  const [viewImage, setViewImage] = useState(false);

  const handleOpenViewImage = () => {
    setViewImage(true);
    document.body.classList.add('no-scroll');
  };

  const handleCloseViewImage =()=>{
    setViewImage(false);
    document.body.classList.remove('no-scroll');
  }

  //forcefully downloading the image regardless of the browser type 
  const handleDownload = async () => {
    try {
      const response = await fetch(download_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `image-${author}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading the image:', error);
    }
  };

  return (
    <div className="image-card">
      <img src={download_url} alt={`Image by ${author}`} />
      <button onClick={handleOpenViewImage}>View Details</button>
      <button className='download-button' onClick={handleDownload} >
      <span class="button-content">Download</span>
      </button>
      {viewImage && <ViewImage image={image} onClose={handleCloseViewImage} />}
    </div>
  );
};

export default ImageCard;
