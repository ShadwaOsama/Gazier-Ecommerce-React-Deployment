import React from 'react';
import Slider from 'react-slick';
import styles from './MediaHome.module.css';

import slide1 from '../../Assets/media1.jpg'; 
import slide6 from '../../Assets/media6.jpg';
import slide3 from '../../Assets/media3.jpg';
import slide4 from '../../Assets/media4.jpg';
import slide5 from '../../Assets/media5.jpg';

const MediaSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 700,
  };

  return (
    <div className={styles.container}>
      <Slider {...settings}>
        <div>
          <img src={slide1} alt="slide1" className={styles.image} />
        </div>
        <div>
          <img src={slide6} alt="slide6" className={styles.image} />
        </div>
        <div>
          <img src={slide3} alt="slide3" className={styles.image} />
        </div>
        <div>
          <img src={slide4} alt="slide4" className={styles.image} />
        </div>
        <div>
          <img src={slide5} alt="slide5" className={styles.image} />
        </div>

      </Slider>
    </div>
  );
};

export default MediaSlider;
