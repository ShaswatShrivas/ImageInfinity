import React from 'react';
import './App.css';
import ImageGallery from './components/ImageGallery';

function App() {
  

  return (
    <div className="App">
      <div className='header'>
        <h1>IMAGE INFINITY</h1>
        </div>
      <ImageGallery/>
      <div className='footer'></div>
    </div>
  );
}

export default App;