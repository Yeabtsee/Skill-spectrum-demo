// Team.js
import React from 'react';
import TeamMember from './TeamMembers';
import team1 from '../../Assets/img/team-3.jpg';
import team2 from '../../Assets/img/team-2.jpg';
import team3 from '../../Assets/img/20211218_1728511.jpg';
import team4 from '../../Assets/img/team-4.jpg';

const teamMembers = [
  {
    image: team1,
    name: 'Yoseph Tewolde',
    position: 'Club President',
    telegram: '#',
    instagram: '#',
    linkedin: '#',
  },
  {
    image: team2,
    name: 'Abel Leulseged',
    position: 'Video Editor',
    telegram: '#',
    instagram: '#',
    linkedin: '#',
  },
  {
    image: team3,
    name: 'Yeabtsega Tesfaye',
    position: 'Web Developer',
    telegram: '#',
    instagram: '#',
    linkedin: '#',
  },
  {
    image: team4,
    name: 'Tinsae Daniel',
    position: 'Programmer',
    telegram: '#',
    instagram: '#',
    linkedin: '#',
  },
  {
    image: team1,
    name: 'Yoseph Tewolde',
    position: 'Club President',
    telegram: '#',
    instagram: '#',
    linkedin: '#',
  },
  {
    image: team2,
    name: 'Abel Leulseged',
    position: 'Video Editor',
    telegram: '#',
    instagram: '#',
    linkedin: '#',
  },
  {
    image: team3,
    name: 'Yeabtsega Tesfaye',
    position: 'Web Developer',
    telegram: '#',
    instagram: '#',
    linkedin: '#',
  },
  {
    image: team4,
    name: 'Tinsae Daniel',
    position: 'Programmer',
    telegram: '#',
    instagram: '#',
    linkedin: '#',
  },
];

const Team = () => {
  return (
    <div className="container-fluid py-5">
      <div className="container pt-5 pb-3">
        <div className="text-center mb-5">
          <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>Teachers</h5>
          <h1>Meet Our Staff</h1>
        </div>
        <div className="row">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              image={member.image}
              name={member.name}
              position={member.position}
              telegram={member.telegram}
              instagram={member.instagram}
              linkedin={member.linkedin}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
