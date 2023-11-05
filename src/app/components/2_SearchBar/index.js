import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import * as API from "src/app/api/api.js";
import styles from "./styles.module.css";

export default function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchResultsRef = React.useRef();
  const searchBarRef = React.useRef();

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target) &&
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        // Click occurred outside of the search bar and search results, clear the search results.
        setSearchResults([]);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      // Clean up the event listener when the component unmounts.
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);


  function getSearchResults(searchTerm) {
    if (searchTerm.length === 0) {
      setSearchResults([]);
      return;
    }
    API.getSearchResultsForQuery(searchTerm, (data) => {
      setSearchResults(data.search_results);
    });
  }

  function getAndSetTop20Results() {
    API.getTopRecords((data) => {
      setSearchResults(data.records);
    });
  }


  useEffect(() => {
    getSearchResults(searchTerm);
  }, [searchTerm]);

  function handleChooseAthlete(athlete) {
    props.setAthlete(athlete);
    setSearchTerm("");
    setSearchResults([]);
  }

  const searchResultsMap = searchResults.map((athlete, index) => (
    <div
    onClick={() => handleChooseAthlete(athlete)}
    className={`${styles.singleResult} ${index === searchResults.length - 1 ? styles.noBorderBottom : ''}`}
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
        <div className={styles.singleResultCountry}>
          {(athlete.country)}
          </div>
        <div className={styles.singleResultDiscipline}>{athlete.disciplines}</div>
      </div>
    </div>
  ));

  return (
    <div
    ref={searchBarRef}
    className={styles.searchBarPositioner}>
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
          onMouseDown={() => getAndSetTop20Results()}
        />
      </div>
      {searchResults.length > 0 && (
        <div
        ref={searchResultsRef}
        className={styles.searchResults}>
          {searchResultsMap}
        </div>
      )}
    </div>
  );
}
