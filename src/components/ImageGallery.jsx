
import React, { useState, useEffect } from 'react';
import ImageCard from './ImageCard';
import axios from 'axios';

const ImageGallery = () => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedAuthor,setSelectedAuthor] = useState('');
  const [author,setAuthor] = useState([]);

  const fetchImages = async (page) => {
    try{
      const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=20`);
      const data = response.data;
      // console.log(data);
      
      setImages(data);
      setFilteredImages(data);
      const authorlist = [...new Set(data.map((image)=>image.author))];
      setAuthor(authorlist);
    }catch(error){
      console.error('Error fetching images',error);
    }
    
  };

  useEffect(() => {
    fetchImages(page);
  }, [page]);

  const handleNextPage = () => {
    setPage(page + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFilterChange = (event) => {    
    // console.log(event);
    const author = event.target.value;
    
    setSelectedAuthor(author);
    if (author === '') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter((image) => image.author === author));
    }
  };

  //horizontal scrollbar effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;

      document.getElementById('progress-bar').style.width = `${scrollPercentage}%`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
  return (
    <>
      <div className="progress-container">
        <div className="progress-bar" id="progress-bar"></div>
      </div>
      <div className="filter-container">
        <label htmlFor="author-filter">Search by Author Name:</label>
        <select
          id="author-filter"
          value={selectedAuthor}
          onChange={handleFilterChange}
        >
          <option value="">All Authors</option>
          {author.map((author, index) => (
            <option key={index} value={author}>
              {author}
            </option>
          ))}
        </select>
      </div>
      <div className="image-gallery-container">
        <div className="image-gallery">
          {filteredImages.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
        <div className="pagination-controls">
          <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
          <button onClick={handleNextPage}>Next</button>
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
