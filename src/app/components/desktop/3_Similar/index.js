import React from "react";
import { Skeleton } from "@mui/material";
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
        <div className={styles.disciplines}>{athlete.disciplines}</div>
      </div>
    );
  });
  return (
    <div className={styles.container}>
      <h1 className={styles.specialh1}>You might also like...</h1>
      <div className={styles.similarHolder}>
        {
          props.loadingNewAthlete ? (
            <div>
              <Skeleton
              height={275}
              />
              <Skeleton
              height={250}
              />
              <Skeleton
              height={250}
              />
                            <Skeleton
              height={250}
              />
            </div>
          ) : (
            similarMap
          )
        }
      </div>
    </div>
  );
}
