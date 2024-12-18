import React from 'react';
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
    target={'_self'}
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

export default Card;
