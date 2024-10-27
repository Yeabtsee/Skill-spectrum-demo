// Carousel.js
import React from "react";


import Carousel1 from '../../Assets/img/carousel-1.jpg'
import Carousel2 from '../../Assets/img/carousel-2.jpg'
import Carousel3 from '../../Assets/img/carousel-3.jpg'
import Carousel4 from '../../Assets/img/carousel-4.jpg'
import Carousel7 from '../../Assets/img/carousel-7.jpg'
import Carousel6 from '../../Assets/img/carousel-6.jpg'
import Carousel5 from '../../Assets/img/row-group-five-african-college-students-spending-time-together-campus-university-yard-black-afro-friends-studying-education-theme.jpg'
import Carousel8 from '../../Assets/img/young-students-posing-with-tablet.jpg'


const Carousel = () => {
   
  return (
    <div className="container-fluid p-0 pb-5 mb-5">
      <div id="header-carousel" className="carousel slide carousel-fade" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#header-carousel" data-slide-to="0" className="active"></li>
          <li data-target="#header-carousel" data-slide-to="1"></li>
          <li data-target="#header-carousel" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active" style={{ minHeight: "300px" }}>
            <img className="position-relative w-100" src={Carousel7} alt="Carousel 1" style={{ minHeight: "300px", objectFit: "cover" }} />
            <div className="carousel-caption d-flex align-items-center justify-content-center">
              <div className="p-5" style={{ width: "100%", maxWidth: "900px" }}>
                <h5 className="text-white text-uppercase mb-md-3"></h5>
                <h1 className="display-3 text-white mb-md-4">Skill Spectrum Students Club</h1>
                <a href="/about" className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2">Learn More</a>
              </div>
            </div>
          </div>
          <div className="carousel-item" style={{ minHeight: "300px" }}>
            <img className="position-relative w-100" src={Carousel8} alt="Carousel 1" style={{ minHeight: "300px", objectFit: "cover" }} />
            <div className="carousel-caption d-flex align-items-center justify-content-center">
              <div className="p-5" style={{ width: "100%", maxWidth: "900px" }}>
                <h5 className="text-white text-uppercase mb-md-3"></h5>
                <h1 className="display-3 text-white mb-md-4">The Right Place to be</h1>
                <a href="/about" className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2">Learn More</a>
              </div>
            </div>
          </div>
          <div className="carousel-item " style={{ minHeight: "300px" }}>
            <img className="position-relative w-100" src={Carousel5} alt="Carousel 1" style={{ minHeight: "300px", objectFit: "cover" }} />
            <div className="carousel-caption d-flex align-items-center justify-content-center">
              <div className="p-5" style={{ width: "100%", maxWidth: "900px" }}>
                <h5 className="text-white text-uppercase mb-md-3"></h5>
                <h1 className="display-3 text-white mb-md-4">More than a club, We are a family</h1>
                <a href="/about" className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2">Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
