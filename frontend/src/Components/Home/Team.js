import React from 'react';
import { Link } from 'react-router-dom';
import team1 from '../../Assets/img/team-3.jpg';
import team2 from '../../Assets/img/team-2.jpg';
import team3 from '../../Assets/img/20211218_1728511.jpg';
import team4 from '../../Assets/img/team-4.jpg';
import team5 from '../../Assets/img/team-1.jpg';
import team6 from '../../Assets/img/team-2.jpg';

const Team = () => {
  return (
        <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
            <div className="text-center mb-5">
                <h5 className="text-primary text-uppercase mb-3" style={{letterSpacing: '5px'}}>Teachers</h5>
                <h1>Meet Our Staff</h1>
            </div>
            <div className="row">
                <div className="col-md-6 col-lg-3 text-center team mb-4">
                    <div className="team-item rounded overflow-hidden mb-2">
                        <div className="team-img position-relative">
                            <img className="img-fluid" src={team4} alt=""/>
                            <div className="team-social">
                                <Link className="btn btn-outline-light btn-square mx-1" to="#"><i className="fab fa-telegram"></i></Link>
                                <Link className="btn btn-outline-light btn-square mx-1" to="#"><i className="fab fa-instagram"></i></Link>
                                <Link className="btn btn-outline-light btn-square mx-1" to="#"><i className="fab fa-linkedin-in"></i></Link>
                            </div>
                        </div>
                        <div className="bg-secondary p-4">
                            <h5>Yoseph Tewolde</h5>
                            <p className="m-0">Club President</p>
                        </div>
                       
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 text-center team mb-4">
                    <div className="team-item rounded overflow-hidden mb-2">
                        <div className="team-img position-relative">
                            <img className="img-fluid" src={team2} alt=""/>
                            <div className="team-social">
                                <Link className="btn btn-outline-light btn-square mx-1" to="#"><i className="fab fa-telegram"></i></Link>
                                <Link className="btn btn-outline-light btn-square mx-1" to="#"><i className="fab fa-instagram"></i></Link>
                                <Link className="btn btn-outline-light btn-square mx-1" to="#"><i className="fab fa-linkedin-in"></i></Link>
                            </div>
                        </div>
                        <div className="bg-secondary p-4">
                            <h5>Abel Leulseged</h5>
                            <p className="m-0">Video Editor</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 text-center team mb-4">
                    <div className="team-item rounded overflow-hidden mb-2">
                        <div className="team-img position-relative">
                            <img className="img-fluid" src={team3} alt=""/>
                            <div className="team-social">
                                <Link className="btn btn-outline-light btn-square mx-1" to="#"><i className="fab fa-telegram"></i></Link>
                                <Link className="btn btn-outline-light btn-square mx-1" to="#"><i className="fab fa-instagram"></i></Link>
                                <Link className="btn btn-outline-light btn-square mx-1" to="#"><i className="fab fa-linkedin-in"></i></Link>
                            </div>
                        </div>
                        <div className="bg-secondary p-4">
                            <h5>Yeabtsega Tesfaye</h5>
                            <p className="m-0">Web Developer</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 text-center team mb-4">
                    <div className="team-item rounded overflow-hidden mb-2">
                        <div className="team-img position-relative">
                            <img className="img-fluid" src={team4} alt=""/>
                            <div className="team-social">
                                <Link className="btn btn-outline-light btn-square mx-1" to="#"><i className="fab fa-telegram"></i></Link>
                                <Link className="btn btn-outline-light btn-square mx-1" to="#"><i className="fab fa-instagram"></i></Link>
                                <Link className="btn btn-outline-light btn-square mx-1" to="#"><i className="fab fa-linkedin-in"></i></Link>
                            </div>
                        </div>
                        <div className="bg-secondary p-4">
                            <h5>Tinsae Daniel</h5>
                            <p className="m-0">Programmer</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Team