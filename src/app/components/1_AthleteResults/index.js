import React, { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import styles from "./styles.module.css";

export default function AthleteResults(props) {
  const [athlete, setAthlete] = useState([]);
  const [loadingNewAthlete, setLoadingNewAthlete] = useState(false);
  const { viewingAthlete } = props;
  const firstDiscipline = viewingAthlete.disciplines.split(",")[0].trim();
  const isFieldAthlete = [
    "Pole Vault",
    "Long Jump",
    "High Jump",
    "Triple Jump",
    "Shot Put",
    "Discus",
    "Hammer",
    "Javelin",
  ].includes(firstDiscipline);

  useEffect(() => {
    setAthlete(props.athlete);
    setTimeout(() => {
      setLoadingNewAthlete(false);
    }, 200);
  }, [props.athlete]);

  function isEven(n) {
    return n % 2 == 0;
  }

  const resultsMap = athlete.map((result, index) => {
    return (
      <div
        key={index}
        className={
          isEven(index) ? styles.singleResult : styles.singleResultDiff
        }
      >
        <div className={styles.tableHeaderLabelSmallBold}>{result.mark}</div>
        <div className={styles.tableHeaderLabelSmall}>{result.discipline}</div>
        <div className={styles.tableHeaderLabelLarge}>{result.venue}</div>
        <div className={styles.tableHeaderLabelSmallDate}>{result.date}</div>
      </div>
    );
  });
  return (
    <div className={styles.tableHolder}>
      <div className={styles.tableHeader}>
        <img
          src={
            "https://cdn.icon-icons.com/icons2/2248/PNG/512/clock_fast_icon_137750.png"
          }
          className={styles.imageIcon}
        />
        LATEST RESULTS
      </div>
      <div className={styles.tableHeaderLabels}></div>
      <div className={styles.resultHolder}>
        {props.loadingNewAthlete ? (
          <div>
            <Skeleton variant="text" height={80} />
            <Skeleton variant="text" height={80} />
            <Skeleton variant="text" height={80} />
            <Skeleton variant="text" height={80} />
          </div>
        ) : (
          resultsMap
        )}
      </div>
    </div>
  );
}
