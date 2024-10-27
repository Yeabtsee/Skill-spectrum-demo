import React from 'react'
import python from '../../Assets/img/python_2.jpg'
import graphics from '../../Assets/img/graphics.jpg'
import C from '../../Assets/img/C++.jpg'
import music from '../../Assets/img/music_2.jpg'
import video from '../../Assets/img/jakob-owens-iF4awMfbBPY-unsplash.jpg'
import interior from '../../Assets/img/Interior_design.jpg'

const Courses = () => {
  return (
    <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
            <div className="text-center mb-5">
                <h5 className="text-primary text-uppercase mb-3" >Subjects</h5>
                <h1>Explore Top Subjects</h1>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="cat-item position-relative overflow-hidden rounded mb-2">
                        <img className="img-fluid" src={python} alt=""/>
                        <a className="cat-overlay text-white text-decoration-none" href="/courses#comp">
                            <h4 className="text-white font-weight-medium">Python</h4>
                        </a>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="cat-item position-relative overflow-hidden rounded mb-2">
                        <img className="img-fluid" src={graphics} alt=""/>
                        <a className="cat-overlay text-white text-decoration-none" href="/courses#graphics">
                            <h4 className="text-white font-weight-medium">Graphics Design</h4>                    
                        </a>
                    </div>
                </div>
                
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="cat-item position-relative overflow-hidden rounded mb-2">
                        <img className="img-fluid" src={C} alt=""/>
                        <a className="cat-overlay text-white text-decoration-none" href="/courses">
                            <h4 className="text-white font-weight-medium">C++</h4>
                        </a>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="cat-item position-relative overflow-hidden rounded mb-2">
                        <img className="img-fluid" src={music} alt=""/>
                        <a className="cat-overlay text-white text-decoration-none" href="/courses">
                            <h4 className="text-white font-weight-medium">Music Composition</h4>
                        </a>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="cat-item position-relative overflow-hidden rounded mb-2">
                        <img className="img-fluid" src={video} alt=""/>
                        <a className="cat-overlay text-white text-decoration-none" href="/courses#video">
                            <h4 className="text-white font-weight-medium">Video Editing</h4>
                        </a>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="cat-item position-relative overflow-hidden rounded mb-2">
                        <img className="img-fluid" src={interior} alt=""/>
                        <a className="cat-overlay text-white text-decoration-none" href="/courses">
                            <h4 className="text-white font-weight-medium">Interior Design</h4>
                        </a>
                    </div>
                </div>
                
              
            </div>
        </div>
    </div>
  )
}

export default Courses