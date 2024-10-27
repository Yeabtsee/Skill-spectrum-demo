import React from 'react'
import info from '../../Assets/img/about.jpg'

const Info = () => {
  return (
    <div className="container-fluid py-5">
        <div className="container py-5">
            <div className="row align-items-center">
                <div className="col-lg-5">
                    <img className="img-fluid rounded mb-4 mb-lg-0" src={info} alt=""/>
                </div>
                <div className="col-lg-7">
                    <div className="text-left mb-4">
                        <h5 className="text-primary text-uppercase mb-3" style={{letterSpacing: '5px'}}>About Us</h5>
                        <h1>Innovative Way To Learn</h1>
                    </div>
                    <p> Welcome to Skill Spectrum, a vibrant community dedicated to empowering individuals through skill development in diverse creative and technical fields. Our club offers a wide range of courses, including Computer Programming, Graphic Design and Video Editing, designed to inspire and equip learners with practical knowledge and hands-on experience.

                        At Skill Spectrum, we believe that learning is a journey best taken together. Whether you're a beginner or looking to sharpen your skills, our mentors and peers are here to support you every step of the way. Join us and explore your potential, collaborate on exciting projects, and turn your passion into mastery.
                        
                        Let's create, innovate, and grow together!</p>
                    <a href="" className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2">Learn More</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Info