import React from 'react';
import './JobListing.css';
import PropTypes from 'prop-types';

const JobListing = ({ job }) => (
  <div className="job-section" data-testid={`job-listing-${job.id}`}>
    <p className="job-title">
      {job.org} | {job.title}
    </p>
    <p className="job-date">{job.dates}</p>
    <ul>
      {job.highlights.map((element) => (
        <li key={element}>{element}</li>
      ))}
    </ul>
  </div>
);

JobListing.defaultProps = {
  job: null,
};

JobListing.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.number,
    org: PropTypes.string,
    title: PropTypes.string,
    dates: PropTypes.string,
    highlights: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default JobListing;
