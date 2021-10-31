import React from 'react';
import './styles.css';

function Index() {
  return (
    <div data-testid="landing-container" className="landing">
      <div data-testid="landing-header-text" className="paragraph-text">
        <div data-testid="about-section">
          <div className="section-header-text">about</div>
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
          <div className="section-header-text">technologies</div>
          <hr />
          <p>
            NodeJs, TypeScript, React, React Native, Ruby on Rails, Mongo,
            GraphQL, PostgreSQL, MySQL, Docker, AWS, Angular, Selenium, Python,
            Git, HTML, CSS, Laravel, Jenkins, Postman, Jira, Linux, Kanban,
            DevOps, Behavior Driven Development, Continuous Delivery
          </p>
        </div>

        <div data-testid="experience-section">
          <div className="section-header-text">experience</div>
          <hr />
          <div className="job-section">
            <p className="job-title">iUNU | software engineer</p>
            <p className="job-date">July 2021 - Present</p>
            <ul>
              <li>
                Design, build, and maintain a modern cultivation management
                platform for desktop and mobile. Main technologies used are
                React, React Native, PostgreSQL, and Ruby on Rails. The original
                company name was Artemis. Artemis was acquired by iUNU in
                September 2021.
              </li>
            </ul>
          </div>
          <div className="job-section">
            <p className="job-title">Kuali | customer success engineer</p>
            <p className="job-date">August 2020 - July 2021</p>
            <ul>
              <li>
                Implementation engineer role where I design, build, and maintain
                tools for ongoing customer success. These tools and methods are
                then used to ensure a high quality experience for Kuali Research
                SaaS customers. Core set of languages and tools used were
                NodeJS, Mongo, MySQL, and AWS.
              </li>
            </ul>
          </div>
          <div className="job-section">
            <p className="job-title">Clevyr | software engineer</p>
            <p className="job-date">November 2019 - August 2020</p>
            <ul>
              <li>
                Worked on several client based projects in a fast paced
                development shop. These projects spanned a diverse set of
                frameworks including Laravel, REact Native, Vue, Angular.
              </li>
            </ul>
          </div>
          <div className="job-section">
            <p className="job-title">Exaptive | qa engineer</p>
            <p className="job-date">January 2018 - November 2019</p>
            <ul>
              <li>
                Developing software quality assurance methods through
                exploratory testing, test case management, and automation.
                Exploratory testing begins with new features, which are recorded
                into test cases. Once test cases are documented, they are
                developed into repeatable automated tests in Selenium and
                Jenkins, generally using NodeJS or Python.
              </li>
            </ul>
          </div>
          <div className="job-section">
            <p className="job-title">Paycom | qa analyst</p>
            <p className="job-date">August 2016 - January 2018</p>
            <ul>
              <li>
                Responsible for testing new development and bug fixes; Work with
                developers and product managers to come up with a solid
                specification of what is needed; Reporting bugs or issues
                through help desk tickets; Researching help desk issues to help
                create development solutions; Assisting other departments
                through product knowledge; Testing monthly and weekly releases;
                Help train new specialists on new items and fixes; Participate
                in Spec meetings with developers, management, and product
                managers to ensure a solid plan on development of new items;
                Special projects as they arise.
              </li>
            </ul>
          </div>
          <div className="job-section">
            <p className="job-title">
              Oklahoma Tourism | fulfillment coordinator
            </p>
            <p className="job-date">March 2013 - March 2016</p>
            <ul>
              <li>
                Coordinate with Oklahoma convention and visitors bureaus
                statewide to respond to consumer requests for travel literature;
                Conduct research to maintain the TravelOK.com database of
                information about restaurants, lodging properties, attractions,
                events and industry contacts; Promote Oklahoma destinations by
                supplying contacts and location suggestions when requested;
                Provide administrative and communications support for the Travel
                Promotion Team; Coordinate web advertising metrics with clients;
                Maintain database in Siebel with all travel information
                requests; Respond to all travel inquiry emails on
                www.TravelOK.com.
              </li>
            </ul>
          </div>
        </div>

        <div data-testid="education-section">
          <div className="section-header-text">education</div>
          <hr />
          <div className="job-section">
            <p className="job-title">
              University of Oklahoma | Bachelor of Arts
            </p>
            <p className="job-date">March 2013 - March 2016</p>
            <ul>
              <li>
                Interdisciplinary Perspectives on the Environment (Focus on
                Geography)
              </li>
            </ul>
          </div>
          <div className="job-section">
            <p className="job-title">
              Oklahoma City Community College | ssociates of Arts
            </p>
            <p className="job-date">March 2013 - March 2016</p>
            <ul>
              <li>Journalism</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
