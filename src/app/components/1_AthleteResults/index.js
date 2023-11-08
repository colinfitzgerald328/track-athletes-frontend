import React, { useEffect, useState } from "react";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import styles from "./styles.module.css";

export default function AthleteResults(props) {
  const [athlete, setAthlete] = useState([]);
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
    setAthlete([]);
    setAthlete(props.athlete);
  }, [props.athlete]);

  const resultsMap = athlete.map((result, index) => {
    return (
      <div key={index} className={styles.singleResult}>
        <div className={styles.tableHeaderLabelSmallBold}>
          {isFieldAthlete ? result.mark + "m" : result.mark}
        </div>
        <div className={styles.tableHeaderLabelSmall}>{result.discipline}</div>
        <div className={styles.tableHeaderLabelLarge}>{result.venue}</div>
        <div className={styles.tableHeaderLabelSmallDate}>{result.date}</div>
      </div>
    );
  });
  return (
    <div className={styles.tableHolder}>
      <div className={styles.tableHeader}>LATEST RESULTS</div>
      <div className={styles.tableHeaderLabels}>
        <div className={styles.tableHeaderLabelSmallLabel}>
          {isFieldAthlete ? "Mark" : "Time"}
        </div>
        <div className={styles.tableHeaderLabelSmall}>Event</div>
        <div className={styles.tableHeaderLabelLarge}>Location</div>
        <div className={styles.tableHeaderLabelSmall}>Date</div>
      </div>
      <div className={styles.resultHolder}>{resultsMap}</div>
    </div>
  );
}
