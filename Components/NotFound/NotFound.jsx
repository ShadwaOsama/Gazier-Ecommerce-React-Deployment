
import React from 'react';
import './NotFound.css'; // Optional: for styling
import errorImage from '../../Assets/NotFound.jpg'; 

const NotFound = () => {
  return (
    <div className="not-found-container">
      <img src={errorImage} alt="404 Error" className="error-image" />
    </div>
  );
};

export default NotFound;
