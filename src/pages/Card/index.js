import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

function Card({ data }) {
  return (
    <div className="simple-card">
      <a href={data.link} target="_blank" rel="noreferrer">
        <img
          style={{ width: '90%', margin: '10px' }}
          alt="shh"
          src={data.img}
        />
        <div>{data.title}</div>
      </a>
    </div>
  );
}

Card.defaultProps = {
  data: null,
};

Card.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    img: PropTypes.string,
    link: PropTypes.string,
  }),
};
export default Card;
