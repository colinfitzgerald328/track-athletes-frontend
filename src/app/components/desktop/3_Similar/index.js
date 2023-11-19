import React from "react";
import styles from "./styles.module.css";

export default function Similar(props) {
  const similarMap = props.similar_athletes.map((athlete) => {
    return (
      <div
        className={styles.similarObjectContainer}
        onClick={() => props.setAthlete(athlete)}
        key={athlete.aaAthleteId}
      >
        <img className={styles.similarImage} src={athlete.hq_image_url} />
        <div className={styles.similarName}>{athlete.full_name}</div>
      </div>
    );
  });
  return (
    <div className={styles.container}>
      <h1 className={styles.specialh1}>You might also like...</h1>
      <div className={styles.similarHolder}>{similarMap}</div>
    </div>
  );
}
