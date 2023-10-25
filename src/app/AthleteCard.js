import React from 'react';
import styles from './styles.module.css';
import Link from 'next/link';

const AthleteCard = ({ athlete }) => {
  const { full_name, hq_image_url, wikipedia_url, instagram_url, summary } = athlete;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h1>{full_name}</h1>
        <div className={styles.socials}>
        <Link legacyBehavior href={wikipedia_url}>
          <a>
            <img className={styles.instagram} src="/wikipedia-logo.svg" alt="Wikipedia" />
          </a>
        </Link>
        <Link legacyBehavior href={instagram_url}>
          <a>
            <img className={styles.instagram} src="/instagram-logo.png" alt="Instagram" />
          </a>
        </Link>
        </div>
      </div>
      <img className={styles.imageThing} src={hq_image_url} alt={full_name} />

      <p className={styles.summary}>{summary}</p>


    </div>
  );
};




export default AthleteCard;
