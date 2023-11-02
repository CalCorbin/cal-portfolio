import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';

interface CardProps {
  data: {
    id: number;
    title: string;
    link: string;
    img: string;
  };
}

const Card = ({ data }: CardProps) => (
  <a
    className={styles.simpleCard}
    href={data.link}
    target="_blank"
    rel="noreferrer"
  >
    <img
      style={{ width: '90%', margin: '10px' }}
      alt={data.title}
      src={data.img}
      data-testid={`card-image-${data.id}`}
    />
    {data.title}
  </a>
);

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
