import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import data from "src/app/data/data.js";
import styles from "./styles.module.css";

export default function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function getSearchResults(searchTerm) {
    if (searchTerm.length === 0) {
      setSearchResults([]);
      return;
    }
    const results = data.filter((athlete) => {
      return athlete.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setSearchResults(results);
  }

  useEffect(() => {
    getSearchResults(searchTerm);
  }, [searchTerm]);

  function handleChooseAthlete(athlete) {
    props.setAthlete(athlete);
    setSearchTerm("");
  }

  const searchResultsMap = searchResults.map((athlete) => (
    <div
    onClick={() => handleChooseAthlete(athlete)}
    className={styles.singleResult}
    key={athlete.id}
    >
      <div className={styles.singleResultImage}>
        <img
          className={styles.athleteImage}
          src={athlete.hq_image_url}
          alt={athlete.full_name}
        />
      </div>
      <div className={styles.singleResultText}>
        <div className={styles.singleResultName}>{athlete.full_name}</div>
        <div className={styles.singleResultCountry}>{athlete.country}</div>
        <div className={styles.singleResultCountry}>{athlete.disciplines}</div>
      </div>
    </div>
  ));

  return (
    <div className={styles.searchBarPositioner}>
      <div className={styles.inputContainer}>
        <SearchIcon
          src="your-image.jpg" // You should set the correct image source
          alt="Search"
          className={styles.inputImage}
          sx={{ marginLeft: 1, fontSize: 30, color: "white" }}
        />
        <input
          type="text"
          className={searchResults.length > 0 ? styles.searchBarFocus : styles.searchBar}
          placeholder="Search for an athlete..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      {searchResults.length > 0 && (
        <div className={styles.searchResults}>
          {searchResultsMap}
        </div>
      )}
    </div>
  );
}
