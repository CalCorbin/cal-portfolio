import React from 'react';
import './Resume.css';
import JOBS from '../../constants/jobs';
import JobListing from '../../components/JobListing';

const Resume = function () {
  return (
    <div data-testid="resume-page" className="resume-page">
      <div>
        <div data-testid="about-section">
          <div className="section-header">about</div>
          <hr />
          <p>
            Passionate and skilled software engineer. Experienced in modern
            software practices, high quality code, and rapid product
            development. Capable of balancing rapid learning versus implementing
            vetted paradigms. Comfortable working alone, on a team, or directly
            with clients by listening to them and creating solutions that meet
            their needs.
          </p>
        </div>

        <div data-testid="technologies-section">
          <div className="section-header">technologies</div>
          <hr />
          <p>
            React, Python, Django, NodeJs, TypeScript, React Native, Ruby on
            Rails, Mongo, GraphQL, PostgreSQL, MySQL, Docker, AWS, Angular,
            Selenium, Git, HTML, CSS, Laravel, Jenkins, Postman, Jira, Linux,
            Kanban, DevOps, Behavior Driven Development, Continuous Delivery
          </p>
        </div>

        <div data-testid="experience-section">
          <div className="section-header">experience</div>
          <hr />
          {JOBS.map((job) => (
            <JobListing key={job.id} job={job} />
          ))}
        </div>

        <div data-testid="education-section">
          <div className="section-header">education</div>
          <hr />
          <div className="job-section">
            <p className="job-title">
              University of Oklahoma | Bachelor of Arts
            </p>
            <p className="job-date">August 2010 - December 2012</p>
            <ul>
              <li>
                Interdisciplinary Perspectives on the Environment (Focus on
                Geography)
              </li>
            </ul>
          </div>
          <div className="job-section">
            <p className="job-title">
              Oklahoma City Community College | Associates of Arts
            </p>
            <p className="job-date">August 2007 - May 2010</p>
            <ul>
              <li>Journalism</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
