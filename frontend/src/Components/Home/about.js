import React from 'react'
import image from '../../Assets/img/about.jpg'

const about = () => {
  return (
    <div className="container-fluid py-5">
        <div className="container py-5">
            <div className="row align-items-center">
                <div className="col-lg-5">
                    <img className="img-fluid rounded mb-4 mb-lg-0" src={image} alt=""/>
                </div>
                <div className="col-lg-7">
                    <div className="text-left mb-4">
                        <h5 className="text-primary text-uppercase mb-3" >About Us</h5>
                        <h1>What we do</h1>
                    </div>
                    <p>Skill Spectrum is a dynamic club dedicated to empowering students
                         by sharing and enhancing skills in Computer Programming, Graphics Design,
                          Video Editing, and Music Composition. Our goal is to create a vibrant 
                          learning community where creativity meets technology, enabling members 
                          to grow, collaborate, and excel in their chosen fields. 
                          Join us on this exciting journey of skill development and innovation!</p>
                    <a href="/about" className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2">Learn More</a>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default about