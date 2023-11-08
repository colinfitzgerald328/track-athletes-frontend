import React from "react";
import * as API from "src/app/api/api.js";
import AthleteResults from "./1_AthleteResults";
import SearchBar from "./2_SearchBar";
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import styles from "./styles.module.css";

export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      athlete: [],
      athlete_data: [],
      athlete_pbs: [],
      athlete_accolades: [],
    };
  }

  getResultsForAthlete(athlete_id) {
    API.getResultsForAthlete(athlete_id, (results) => {
      console.log(results);
      this.setState({
        athlete_data: results["athlete_data"],
      });
    });
  }

  getPBSForAthlete(athlete_id) {
    API.getPBSForAthlete(athlete_id, (data) => {
      this.setState({
        athlete_pbs: data["personal_bests"],
      });
    });
  }

  getAccoladesForAthlete(url_slug) {
    API.getAccoladesForAthlete(url_slug, (data) => {
      this.setState({
        athlete_accolades: data["accolades"],
      });
    }
    );
  }

  componentDidMount() {
    this.fetchRandomAthlete();
    // this.getResultsForAthlete(this.state.athlete.aaAthleteId);
  }

  setAthlete(athlete) {
    this.setState({
      athlete: athlete,
    });
    this.getResultsForAthlete(athlete.aaAthleteId);
    this.getPBSForAthlete(athlete.aaAthleteId);
    this.getAccoladesForAthlete(athlete.urlSlug);
  }

  fetchRandomAthlete() {
    API.getRandomDoc((athlete) => {
      console.log(athlete);
      this.setState({
        athlete: athlete.random_doc,
      });
      this.getResultsForAthlete(athlete.random_doc.aaAthleteId);
      this.getPBSForAthlete(athlete.random_doc.aaAthleteId);
      this.getAccoladesForAthlete(athlete.random_doc.urlSlug);
    });
  }

  separateSentencesIntoParagraphs(text) {
    if (!text) {
      return "";
    }
    // Split the text into sentences using regular expressions.
    const sentences = text.split(/(?<=[.!?])\s+/);

    // Join the sentences to create separate paragraphs.
    const paragraphs = sentences.map(
      (sentence, index) =>
        <p key={index} className={styles.sentence}>{sentence}</p>,
    );

    // Join the paragraphs to create the final result.
    return paragraphs
  }

  normalizeName(name) {
    const nameParts = name.toLowerCase().split(" ");
    const normalizedParts = nameParts.map((part) => {
      return part.charAt(0).toUpperCase() + part.slice(1);
    });
    return normalizedParts.join(" ");
  }

  render() {
    console.log(this.state.athlete_pbs)
    if (this.state.athlete.length === 0) {
      return <div>Loading...</div>;
    } else if (this.state.athlete) {
      return (
        <div className={styles.main}>
          <div className={styles.pageLabel}>
            athletics hub
          </div>
          <div className={styles.mainBackground}>
            <SearchBar
              setAthlete={this.setAthlete.bind(this)}
              athlete={this.state.athlete}
            />
            <div className={styles.mainImage}>
              <img
                className={styles.athleteImage}
                src={this.state.athlete.hq_image_url}
              />
            </div>
            <div className={styles.mainText}>
              <div className={styles.container}>
                <div className={styles.mainTitle}>
                  <div>{this.state.athlete.full_name}</div>
                  <div className={styles.mainEvents}>
                    {this.state.athlete.disciplines}
                  </div>
                </div>
                <div className={styles.rightContainer}>
                  <div
                    onClick={() =>
                      window.open(this.state.athlete.wikipedia_url)
                    }
                    className={styles.openLink}
                  >
                    READ MORE
                  </div>
                  <div className={styles.socialIconHolder}>
                    <img
                      onClick={() =>
                        window.open(this.state.athlete.instagram_url)
                      }
                      className={styles.image}
                      src="https://worldathletics.org/static/instagram.svg"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.mainSummary}>
                <div className={styles.leftItemsHolder}>
                <div className={styles.summaryLabel}>
                <AttachFileIcon></AttachFileIcon> NOTEBOOK
                </div>
                <div className={styles.summary}>
                  {this.separateSentencesIntoParagraphs(this.state.athlete.summary)}
                </div>
                </div>
                <div className={styles.rightItemsHolder}>
                <div className={styles.closestCompetitors}>
                  <div className={styles.label}>
                    <LocalFireDepartmentIcon
                    ></LocalFireDepartmentIcon> COMPETITION
                  </div>
                  <div className={styles.competitors}>
                  {this.state.athlete.top_competitors.map(
                      (competitor, index) => (
                        <div
                        key={index}
                        className={styles.competitor}>
                          {index + 1}. {this.normalizeName(competitor)}
                        </div>
                      ),
                    )}
                  </div>
                </div>
                <div className={styles.closestCompetitors}>
                  <div className={styles.label}>PERSONAL BESTS
                  </div>
                  <div className={styles.competitors}>
                  {this.state.athlete_pbs.map(
                      (data, index) => (
                        <div
                        key={index}
                        className={styles.competitor}>
                          {data.discipline} - {data.result}
                        </div>
                      ),
                    )}
                  </div>
                </div>
                <div className={styles.closestCompetitors}>
                  <div className={styles.label}>ACCOLADES
                  </div>
                  <div className={styles.competitors}>
                  {this.state.athlete_accolades.map(
                      (accolade, index) => (
                        <div
                        key={index}
                        className={styles.competitor}>
                          {accolade}
                        </div>
                      ),
                    )}
                  </div>
                </div>
                </div>
              </div>
            </div>
            <AthleteResults
              athlete={this.state.athlete_data}
              viewingAthlete={this.state.athlete}
            />
          </div>
        </div>
      );
    }
  }
}
