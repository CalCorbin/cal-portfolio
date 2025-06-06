import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Talks.module.css';

const Talks = () => {
  const TALKS = [
    {
      id: 'video1',
      videoId: 'Az6Glc63tp0',
      title: 'Test Driven Development with Cypress',
    },
    {
      id: 'video2',
      videoId: 'jg6-5EwdeZ0',
      title: 'Shipping Good Software Fast',
    },
    {
      id: 'video3',
      videoId: 'wUD4sHZtIWE',
      title: 'Solve Problems, Not Syntax',
    },
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handlePrevVideo = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? TALKS.length - 1 : prevIndex - 1
    );
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === TALKS.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentVideo = TALKS[currentVideoIndex];

  return (
    <section data-testid="talks-section" className={styles.talksSection}>
      <h2>
        <FontAwesomeIcon icon={faVideo} className={styles.sectionIcon} />
        <span>tech talks</span>
      </h2>

      <div className={styles.videoContainer}>
        <button
          className={styles.videoNavButton}
          onClick={handlePrevVideo}
          aria-label="Previous video"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <div className={styles.videoWrapper}>
          <div className={styles.videoResponsive}>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${currentVideo.videoId}`}
              title={currentVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <h3 className={styles.videoTitle}>{currentVideo.title}</h3>
          <div className={styles.videoPagination}>
            {TALKS.map((_, index) => (
              <span
                key={index}
                className={`${styles.paginationDot} ${index === currentVideoIndex ? styles.activeDot : ''}`}
                onClick={() => setCurrentVideoIndex(index)}
                role="button"
                aria-label={`Go to video ${index + 1}`}
              ></span>
            ))}
          </div>
        </div>

        <button
          className={styles.videoNavButton}
          onClick={handleNextVideo}
          aria-label="Next video"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </section>
  );
};

export default Talks;
