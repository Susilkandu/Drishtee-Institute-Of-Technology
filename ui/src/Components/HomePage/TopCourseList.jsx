import React from 'react';
import { Link } from 'react-router-dom';
const TopCourseList = () => {
  const images = [
    { src: "images/topCourses/nodejs.png", title: "node.js" },
    { src: "images/topCourses/mongoDb.png", title: "mongo Db" },
    { src: "images/topCourses/reactJs.png", title: "React.js" },
    { src: "images/topCourses/oLevel.png", title: "O level" },
    { src: "images/topCourses/Adca.png", title: "ADCA" },
    { src: "images/topCourses/webDevelopment.png", title: "Web development" },
    { src: "images/topCourses/python.png", title: "Python" },
    { src: "images/topCourses/softwareDevelopment.png", title: "Software development" },
    { src: "images/topCourses/hardware&Networking.png", title: "Hardware & Networking" },
    { src: "images/topCourses/graphicsDesigning.png", title: "Graphics Designing" },
    { src: "images/topCourses/c++.png", title: "C++" },
  ];

  return (
    <div className="container-fluid py-4" id="CourseContainer" >
      <div className="row text-center">
        <div className="col-12">
          <h1 className="fw-bolder text-light" id="courseTitle" data-aos="fade-up" data-aos-duration="1000">
            TOP COURSE
          </h1>
        </div>
      </div>
      <div className="container d-flex justify-content-center align-items-center" style={{ zIndex: 1 }}>
        <div className="row justify-content-center">
          {images.map((image, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 p-3 d-flex justify-content-center">
              <div className="card p-1" style={{ width: '230px', height: '230px' }} data-aos="zoom-in">
                <Link to="/AdmissionForm" className="text-white nav-link">
                  <img src={image.src} className="card-img-top img-fluid" style={{ objectFit: 'cover', width: '100%', height: '100%' }} alt={image.title} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default TopCourseList;
