import React from 'react';
import { Carousel } from 'antd';

const imageUrls = [
  'https://jobsinfootball.com/files/pictures/how_long_is_a_soccer_field.jpeg',
  'https://5.imimg.com/data5/SELLER/Default/2022/9/FJ/LX/DE/11336583/box-cricket-ground-constrcution.jpg',
  'https://as1.ftcdn.net/v2/jpg/01/97/59/00/1000_F_197590083_wMAKHkaJRskMjQNAJ8rrdBoraXN3Dy40.jpg',
  'https://www.avantagesport.com/wp-content/uploads/2015/09/SyntheticTurf_Application.jpg'
  
];

const MyCarousel = () => (
  <Carousel autoplay>
    {imageUrls.map((imageUrl, index) => (
      <div key={index}>
        <img src={imageUrl} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
      </div>
    ))}
  </Carousel>
);

export default MyCarousel;
