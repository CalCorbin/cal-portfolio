import React from 'react';
import NavigationBar from '../../components/NavigationBar';
import './styles.css';

function LandingPage() {
  return (
    <div data-testid="landing-container" className="landing">
      <div data-testid="landing-header-text" className="paragraph-text">
        <p className="section-header-text">cal corbin - software engineer</p>
        <hr />
        <p>
          Passionate and skilled software engineer. Experienced in modern
          software practices, high quality code, and rapid product development.
          Capable of balancing rapid learning versus implementing vetted
          paradigms. Comfortable working alone, on a team, or directly with
          clients by listening to them and creating solutions that meet their
          needs.
        </p>
        <div className="section-header-text">technologies</div>
        <hr />
        <p>
          NodeJs, TypeScript, React, React Native, Ruby on Rails, Mongo,
          GraphQL, PostgreSQL, MySQL, Docker, AWS, Angular, Selenium, Python,
          Git, HTML, CSS, Laravel, Jenkins, Postman, Jira, Linux, Kanban,
          DevOps, Behavior Driven Development, Continuous Delivery
        </p>
        <p className="section-header-text">experience</p>
        <hr />
        <ul>
          <li>iUNU</li>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <li>Kuali</li>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <li>Clevyr</li>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <li>Exaptive</li>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <li>Paycom</li>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <li>Oklahoma Tourism</li>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
        </ul>
      </div>
    </div>
  );
}

export default LandingPage;
