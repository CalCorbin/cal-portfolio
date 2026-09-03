import React, { useState } from 'react';
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

const Card = ({ data }: CardProps) => {
  const [hidden, setHidden] = useState(true);

  return (
    <a
      className={styles.simpleCard}
      href={data.link}
      target={'_self'}
      rel="noreferrer"
    >
      <div
        className={styles.imageWrapper}
        onMouseEnter={() => setHidden(!hidden)}
      >
        <img
          alt={data.title}
          src={data.img}
          data-testid={`card-image-${data.id}`}
        />
        <span
          data-testid="card-overlay"
          className={styles.overlay}
          aria-hidden={hidden}
        >
          {data.description}
        </span>
      </div>
      {data.title}
    </a>
  );
};

export default Card;
