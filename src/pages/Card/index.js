import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

function Card({ data }) {
  return (
    <div className="simple-card" data-testid={`card-${data.id}`}>
      <a
        href={data.link}
        target="_blank"
        rel="noreferrer"
        data-testid={`card-link-${data.id}`}
      >
        <img
          style={{ width: '90%', margin: '10px' }}
          alt={data.title}
          src={data.img}
          data-testid={`card-image-${data.id}`}
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
    id: PropTypes.number,
    title: PropTypes.string,
    img: PropTypes.string,
    link: PropTypes.string,
  }),
};
export default Card;
