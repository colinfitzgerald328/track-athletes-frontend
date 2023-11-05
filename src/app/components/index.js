import React from "react";
import * as API from "src/app/api/api.js";
import AthleteResults from "./1_AthleteResults";
import SearchBar from "./2_SearchBar";
import styles from "./styles.module.css";

export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      athlete: [],
      athlete_data: [],
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

  componentDidMount() {
    this.fetchRandomAthlete();
    // this.getResultsForAthlete(this.state.athlete.aaAthleteId);
  }

  setAthlete(athlete) {
    this.setState({
      athlete: athlete,
    });
    this.getResultsForAthlete(athlete.aaAthleteId);
  }

  fetchRandomAthlete() {
    API.getRandomDoc((athlete) => {
      console.log(athlete)
      this.setState({
        athlete: athlete.random_doc,
      });
      this.getResultsForAthlete(athlete.random_doc.aaAthleteId);
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
      (sentence) =>
        `<p style="margin-bottom: 10px; margin-right: 10px;">${sentence}</p>`,
    );

    // Join the paragraphs to create the final result.
    return paragraphs.join("\n");
  }

  render() {

    if (this.state.athlete.length === 0) {
      return <div>Loading...</div>;
    } else if (this.state.athlete) {
    return (
      <div className={styles.main}>
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
                  onClick={() => window.open(this.state.athlete.wikipedia_url)}
                  className={styles.openLink}
                >
                  Read more
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
            <div
              className={styles.mainSummary}
              dangerouslySetInnerHTML={{ __html: this.separateSentencesIntoParagraphs(this.state.athlete.summary) }}
            />
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