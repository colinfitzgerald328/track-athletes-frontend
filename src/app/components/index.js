import React from "react";
import * as API from "src/app/api/api.js";
import AthleteResults from "./1_AthleteResults";
import SearchBar from "./2_SearchBar";
import Skeleton from "@mui/material/Skeleton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import styles from "./styles.module.css";

export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      athlete: [],
      athlete_data: [],
      athlete_pbs: [],
      athlete_accolades: [],
      loadingNewAthlete: false,
    };
  }

  getResultsForAthlete(athlete_id) {
    return new Promise((resolve, reject) => {
      API.getResultsForAthlete(
        athlete_id,
        (results) => {
          console.log(results);
          this.setState({
            athlete_data: results["athlete_data"],
          });
          resolve(results); // Resolve the promise with the data
        },
        (error) => {
          reject(error); // Reject the promise with the error
        },
      );
    });
  }

  getPBSForAthlete(athlete_id) {
    return new Promise((resolve, reject) => {
      API.getPBSForAthlete(
        athlete_id,
        (data) => {
          this.setState({
            athlete_pbs: data["personal_bests"],
          });
          resolve(data); // Resolve the promise with the data
        },
        (error) => {
          reject(error); // Reject the promise with the error
        },
      );
    });
  }

  getAccoladesForAthlete(url_slug) {
    return new Promise((resolve, reject) => {
      API.getAccoladesForAthlete(
        url_slug,
        (data) => {
          this.setState({
            athlete_accolades: data["accolades"],
          });
          resolve(data); // Resolve the promise with the data
        },
        (error) => {
          reject(error); // Reject the promise with the error
        },
      );
    });
  }

  componentDidMount() {
    this.fetchRandomAthlete();
    // this.getResultsForAthlete(this.state.athlete.aaAthleteId);
  }

  setAthlete = async (athlete) => {
    this.setState({
      athlete: athlete,
      loadingNewAthlete: true,
    });

    try {
      await Promise.all([
        this.getResultsForAthlete(athlete.aaAthleteId),
        this.getPBSForAthlete(athlete.aaAthleteId),
        this.getAccoladesForAthlete(athlete.urlSlug),
      ]);

      this.setState({
        loadingNewAthlete: false,
      });
    } catch (error) {
      console.error("Error occurred:", error);

      this.setState({
        loadingNewAthlete: false,
      });
    }
  };

  fetchRandomAthlete() {
    API.getRandomDoc((athlete) => {
      this.setState({
        athlete: athlete.random_doc,
      });
      this.setAthlete(athlete.random_doc);
    });
  }

  setAthleteFromTopCompetitors(athlete_id) {
    API.getAthleteById(athlete_id, (athlete) => {
      this.setState({
        athlete: athlete.found_athlete,
      });
      this.setAthlete(athlete.found_athlete);
    });
  }

  separateSentencesIntoParagraphs(text) {
    if (!text) {
      return "";
    }
    // Split the text into sentences using regular expressions.
    const sentences = text.split(". ");

    // Join the sentences to create separate paragraphs.
    const paragraphs = sentences.map((sentence, index) => (
      <p key={index} className={styles.sentence}>
        {index === sentences.length - 1 ? sentence : sentence + "."}
      </p>
    ));

    // Join the paragraphs to create the final result.
    return paragraphs;
  }

  normalizeName(name) {
    const nameParts = name.toLowerCase().split(" ");
    const normalizedParts = nameParts.map((part) => {
      return part.charAt(0).toUpperCase() + part.slice(1);
    });
    return normalizedParts.join(" ");
  }

  formatAccolade(accolade) {
    const parts = accolade.split("x");
    const count = parts[0];
    const name = parts[1];
    return (
      <div className={styles.accoladeContainer}>
        <b style={{ marginRight: "5px" }}>{count}x</b> {name}
      </div>
    );
  }

  render() {
    if (this.state.athlete.length === 0) {
      return <div>Loading...</div>;
    } else if (this.state.athlete) {
      return (
        <div className={styles.main}>
          <div className={styles.pageLabel}>athletics hub</div>
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
                  {this.state.athlete.instagram_url && (
                    <div className={styles.socialIconHolder}>
                      <img
                        onClick={() =>
                          window.open(this.state.athlete.instagram_url)
                        }
                        className={styles.image}
                        src="https://worldathletics.org/static/instagram.svg"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.mainSummary}>
                <div className={styles.leftItemsHolder}>
                  <div className={styles.summaryLabel}>
                    <AttachFileIcon></AttachFileIcon> NOTEBOOK
                  </div>
                  <div className={styles.summary}>
                    {this.separateSentencesIntoParagraphs(
                      this.state.athlete.summary,
                    )}
                  </div>
                </div>
                <div className={styles.rightItemsHolder}>
                  <div className={styles.closestCompetitors}>
                    <div className={styles.label}>
                      <LocalFireDepartmentIcon
                        sx={{ margin: 0, padding: 0 }}
                      ></LocalFireDepartmentIcon>
                      COMPETITION
                    </div>
                    <div className={styles.competitorsWithSlightlyLessMargin}>
                      {this.state.loadingNewAthlete ? (
                        <div>
                          <Skeleton />
                          <Skeleton />
                          <Skeleton />
                        </div>
                      ) : (
                        this.state.athlete.top_competitors_with_reference.map(
                          (competitor, index) => (
                            <div
                              key={index}
                              className={
                                competitor.athlete_id
                                  ? styles.competitor
                                  : styles.competitorNoLink
                              }
                              onClick={() =>
                                this.setAthleteFromTopCompetitors(
                                  competitor.athlete_id,
                                )
                              }
                            >
                              {index + 1}.{" "}
                              <b style={{ marginLeft: "5px" }}>
                                {this.normalizeName(competitor.athlete_name)}
                              </b>
                            </div>
                          ),
                        )
                      )}
                    </div>
                  </div>
                  <div className={styles.closestCompetitors}>
                    <div className={styles.label}>PERSONAL BESTS</div>
                    <div className={styles.competitors}>
                      {this.state.loadingNewAthlete ? (
                        <div>
                          <Skeleton />
                          <Skeleton />
                          <Skeleton />
                        </div>
                      ) : (
                        this.state.athlete_pbs.map((data, index) => (
                          <div key={index} className={styles.competitorNoLink}>
                            <b style={{ marginRight: "5px" }}>{data.result}</b>{" "}
                            - {data.discipline}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  <div className={styles.closestCompetitors}>
                    <div className={styles.label}>ACCOLADES</div>
                    <div className={styles.competitors}>
                      {this.state.loadingNewAthlete ? (
                        <div>
                          <Skeleton />
                          <Skeleton />
                          <Skeleton />
                        </div>
                      ) : (
                        this.state.athlete_accolades.map((accolade, index) => (
                          <div key={index} className={styles.accoladesBox}>
                            {this.formatAccolade(accolade)}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <AthleteResults
              athlete={this.state.athlete_data}
              viewingAthlete={this.state.athlete}
              loadingNewAthlete={this.state.loadingNewAthlete}
            />
          </div>
        </div>
      );
    }
  }
}
