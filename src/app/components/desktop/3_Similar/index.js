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
        {props.loadingNewAthlete ? (
          <div className={styles.similarImage}>
            <Skeleton variant="rectangular" height={150} />
          </div>
        ) : (
          <img className={styles.similarImage} src={athlete.hq_image_url} />
        )}
        {props.loadingNewAthlete ? (
          <Skeleton
            variant="text"
            width={150}
            height={40}
            style={{ marginLeft: "10px" }}
          />
        ) : (
          <div className={styles.similarName}>{athlete.full_name}</div>
        )}
        {props.loadingNewAthlete ? (
          <Skeleton
            variant="text"
            width={150}
            height={20}
            style={{ marginLeft: "10px", marginBottom: "5px" }}
          />
        ) : (
          <div className={styles.disciplines}>{athlete.disciplines}</div>
        )}
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
