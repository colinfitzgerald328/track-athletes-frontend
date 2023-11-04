import React from "react";
import styles from "./styles.module.css";

export default function AthleteResults(props) {
  const { athlete } = props;
  const { viewingAthlete } = props;
  const isFieldAthlete = viewingAthlete.disciplines.includes("Pole Vault") || viewingAthlete.disciplines.includes("Long Jump") || viewingAthlete.disciplines.includes("High Jump") || viewingAthlete.disciplines.includes("Triple Jump") || viewingAthlete.disciplines.includes("Shot Put") || viewingAthlete.disciplines.includes("Discus") || viewingAthlete.disciplines.includes("Hammer") || viewingAthlete.disciplines.includes("Javelin");
  const resultsMap = athlete.map((result, index) => {
    return (
      <div key={index} className={styles.singleResult}>
        <div className={styles.tableHeaderLabelSmallBold}>{isFieldAthlete ? result.mark + "m" : result.mark}</div>
        <div className={styles.tableHeaderLabelSmall}>{result.discipline}</div>
        <div className={styles.tableHeaderLabelLarge}>{result.venue}</div>
        <div className={styles.tableHeaderLabelSmallDate}>{result.date}</div>
      </div>
    );
  });
  return (
    <div className={styles.tableHolder}>
      <div className={styles.tableHeader}>[Latest Results]</div>
      <div className={styles.tableHeaderLabels}>
        <div className={styles.tableHeaderLabelSmallLabel}>{isFieldAthlete ? "Mark" : "Time"}</div>
        <div className={styles.tableHeaderLabelSmall}>Event</div>
        <div className={styles.tableHeaderLabelLarge}>Location</div>
        <div className={styles.tableHeaderLabelSmall}>Date</div>
      </div>
      <div className={styles.resultHolder}>{resultsMap}</div>
    </div>
  );
}
