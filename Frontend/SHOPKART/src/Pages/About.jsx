import React from 'react';
import '../Styles/about.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-card">

        <img
          src="my photo.jpeg"
          alt="Chandan Yadav"
          className="profile-image"
        />

        <h2 className="about-title">About Me</h2>

        <h3 className="about-name">
          Chandan Yadav
        </h3>

        <p className="about-role">
          Full Stack Developer
        </p>

        <p className="about-description">
          Passionate about building modern web applications using
          React, Node.js, Express, MongoDB and continuously learning
          Networking, Cloud and emerging technologies.
        </p>

        <div className="skills">
          <span>React</span>
          <span>Node.js</span>
          <span>MongoDB</span>
          <span>Express</span>
          <span>Redux</span>
          <span>Networking</span>
          <span>Cloud</span>
        </div>

        <div className="social-links">
          <a href="mailto:chanduyadav24042009@gmail.com
          " className="social-btn">📧 Email</a>
          <a href="https://www.linkedin.com/in/chandu-yadav2" target="_blank" rel="noopener noreferrer" className="social-btn linkedin">💼 LinkedIn</a>
          <a href="https://github.com/ChanduYadav89" target="_blank" rel="noopener noreferrer" className="social-btn github">💻 GitHub</a>
        </div>

      </div>
    </div>
  );
};

export default About;