import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  data: {
    id: number;
    title: string;
    link: string;
    img: string;
    description: string;
  };
}

const Card = ({ data }: CardProps) => (
  <a
    className={styles.simpleCard}
    href={data.link}
    target={'_self'}
    rel="noreferrer"
  >
    <div className={styles.imageWrapper}>
      <img
        alt={data.title}
        src={data.img}
        data-testid={`card-image-${data.id}`}
      />
      <span className={styles.overlay}>{data.description}</span>
    </div>
    {data.title}
  </a>
);

export default Card;
