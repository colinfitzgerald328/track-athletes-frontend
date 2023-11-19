import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Skeleton from "@mui/material/Skeleton";
import * as API from "src/app/api/api.js";
import styles from "./styles.module.css";

export default function SearchBar(props) {
  const [loading, setLoading] = useState(false);
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
        // Click occurred outside of the search bar and search results, clear the search results
        setSearchResults([]);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  function getAndSetTop20Results() {
    API.getTopRecords((data) => {
      setSearchResults(data.records);
    });
  }

  function handleChooseAthlete(athlete) {
    props.setAthlete(athlete);
    setSearchTerm("");
    setSearchResults([]);
  }

  const searchTermRef = useRef("");
  const timeoutIdRef = useRef(null);

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    searchTermRef.current = newSearchTerm;
    getSearchResults(newSearchTerm);
  };

  const getSearchResults = (searchTerm) => {
    if (searchTerm.length === 0) {
      setSearchResults([]);
      clearTimeout(timeoutIdRef.current);
      return;
    }

    // Update the ref with the current search term
    searchTermRef.current = searchTerm;

    // Clear the previous timeout
    clearTimeout(timeoutIdRef.current);

    timeoutIdRef.current = setTimeout(() => {
      console.log("getting search results for query", searchTermRef.current);
      setLoading(true);
      setTimeout(() => {
        API.getSearchResultsForQuery(searchTermRef.current, (data) => {
          setSearchResults(data.search_results);
          setLoading(false);
        });
      }, 200);
    }, 200);
  };

  // Cleanup the timeout when the component unmounts
  useEffect(() => {
    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, []);

  const searchResultsMap = searchResults.map((athlete, index) => (
    <div
      onClick={() => handleChooseAthlete(athlete)}
      className={`${styles.singleResult} ${
        index === searchResults.length - 1 ? styles.noBorderBottom : ""
      }`}
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
        <div className={styles.singleResultDiscipline}>
          {athlete.disciplines}
        </div>
      </div>
    </div>
  ));

  return (
    <div ref={searchBarRef} className={styles.searchBarPositioner}>
      <SearchIcon
        alt="Search"
        className={styles.inputImage}
        sx={{ marginLeft: 1, fontSize: 30, color: "white" }}
      />
      <input
        className={
          searchResults.length > 0 || loading
            ? styles.searchBarFocus
            : styles.searchBar
        }
        placeholder="Search for an athlete..."
        value={searchTerm}
        onChange={(event) => {
          handleInputChange(event);
          setSearchTerm(event.target.value);
        }}
        onMouseDown={() => getAndSetTop20Results()}
      />
      {searchResults.length > 0 && !loading ? (
        <div ref={searchResultsRef} className={styles.searchResults}>
          {searchResultsMap}
        </div>
      ) : loading ? (
        <div ref={searchResultsRef} className={styles.searchResults}>
          <Skeleton height={100} />
          <Skeleton height={100} />
          <Skeleton height={100} />
          <Skeleton height={100} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
