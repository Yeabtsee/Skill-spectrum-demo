// Team.js
import React from 'react';
import TeamMember from './TeamMembers';
import team1 from '../../Assets/img/Josi2.jpg';
import team2 from '../../Assets/img/Abel.jpg';
import team3 from '../../Assets/img/20211218_1728511.jpg';
import team4 from '../../Assets/img/tinsu.jpg';
import team5 from '../../Assets/img/Yg.jpg';
import team6 from '../../Assets/img/image.png';
import team7 from '../../Assets/img/Zeki.JPG';


const teamMembers = [
  {
    image: team1,
    name: 'Yoseph Tewolde',
    position: 'Club President',
    telegram: 'https://t.me/YosephTewolde',
    instagram: 'https://www.instagram.com/_.jossy.t_',
    linkedin: '#',
  },
  {
    image: team2,
    name: 'Abel Leulseged',
    position: 'Video Editor',
    telegram: 'https://t.me/A_L_M_H_101',
    instagram: 'https://www.instagram.com/abel_leulseged/',
    linkedin: 'https://www.linkedin.com/in/abel-mulugeta-3b5901286',
  },
  {
    image: team3,
    name: 'Yeabtsega Tesfaye',
    position: 'Web Developer',
    telegram: 'https://t.me/yeabtsega12',
    instagram: 'https://www.instagram.com/yeabtsega_tesfaye',
    linkedin: 'https://www.linkedin.com/in/yeabtsega-tesfaye-a93b98284',
  },
  {
    image: team4,
    name: 'Tinsae Daniel',
    position: 'Programmer',
    telegram: 'https://t.me/Insane19',
    instagram: '#',
    linkedin: '#',
  },
  {
    image: team5,
    name: 'Yegeta Taye',
    position: 'Web Developer',
    telegram: 'https://t.me/Life_is_goes_on',
    instagram: '#',
    linkedin: '#',
  },
  {
    image: team6,
    name: 'Abenezer Tesfaye',
    position: 'Video Editor',
    telegram: 'https://t.me/Abenitt',
    instagram: '#',
    linkedin: '#',
  },
  {
    image: team7,
    name: 'Zekarias Geremew',
    position: 'Graphics Designer',
    telegram: 'https://t.me/Ze07ki',
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
