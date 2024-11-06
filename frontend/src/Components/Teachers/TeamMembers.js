
import React from 'react';
import { Link } from 'react-router-dom';

const TeamMembers = ({ image, name, position, telegram, instagram, linkedin }) => {
  return (
    <div className="col-md-6 col-lg-3 text-center team mb-4">
      <div className="team-item rounded overflow-hidden mb-2">
        <div className="team-img position-relative">
          <img className="img-fluid" src={image} alt={name} />
          <div className="team-social">
            <Link className="btn btn-outline-light btn-square mx-1" to={telegram} target='blank'><i className="fab fa-telegram"></i></Link>
            <Link className="btn btn-outline-light btn-square mx-1" to={instagram} ><i className="fab fa-instagram"></i></Link>
            <Link className="btn btn-outline-light btn-square mx-1" to={linkedin} ><i className="fab fa-linkedin-in"></i></Link>
          </div>
        </div>
        <div className="bg-secondary p-4">
          <h5>{name}</h5>
          <p className="m-0">{position}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
