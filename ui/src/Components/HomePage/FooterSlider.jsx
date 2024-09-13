
import React from 'react';
import '../../App.css';

const images = [
    'images/thumbnails/python-img.png',
    'images/thumbnails/bootstrap.png',
    'images/thumbnails/sass.png',
    'images/thumbnails/dtp.png',
    'images/thumbnails/ccc.png',
    'images/thumbnails/c-lang.png',
    'images/thumbnails/python-img.png',
    'images/thumbnails/sass.png',
    'images/thumbnails/tally.png',
    'images/thumbnails/pm70.png',
    'images/thumbnails/ms_office.png',
    'images/thumbnails/js.png',
    'images/thumbnails/funda.png',
];

const FooterSlider = () => (
    <marquee
        behavior="scroll"
        direction="left"
        scrollamount="3"
        className="mySwiper p-0 m-0 border-secondary border-bottom d-flex align-content-center"
        id="thumblain"
        style={{ background: '#00062B', padding: '5px' }}
    >
        {[...images, ...images].map((image, index) => (
            <img key={index} src={image} className='img-fluid m-3' alt={`Thumbnail ${index + 1}`} />
        ))}
    </marquee>
);

export default FooterSlider;
