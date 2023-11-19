import React from "react";
import DesktopVersion from "./desktop/desktop";
import MobileVersion from "./mobile/mobile";
import * as API from "src/app/api/api.js";
import styles from "./styles.module.css";

export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      athlete: [],
      athlete_data: [],
      athlete_pbs: [],
      athlete_accolades: [],
      similar_athletes: [],
      width: 0,
      height: 0,
      pageLoaded: false,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowDimensions.bind(this));
    this.updateWindowDimensions();
    this.fetchRandomAthlete();
  }

  getResultsForAthlete(athlete_id) {
    return new Promise((resolve, reject) => {
      API.getResultsForAthlete(
        athlete_id,
        (results) => {
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

  setAthlete = async (athlete) => {
    this.setState({
      athlete: athlete,
      loadingNewAthlete: true,
    });

    try {
      await Promise.all([
        this.getResultsForAthlete(athlete.aaAthleteId),
        this.getPBSForAthlete(athlete.aaAthleteId),
        this.getSimilarAthletes(athlete.aaAthleteId, athlete.summary),
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

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  getSimilarAthletes(athlete_id, summary) {
    API.getSimilarAthletes(
      athlete_id, 
      summary,
      (data) => {
        this.setState({
          similar_athletes: data["similar_athletes"],
        });
      },
      (error) => {
        console.log(error);
      },
    );
  }

  render() {
    if (this.state.width > 1400) {
      return (
        <div className={styles.desktopMain}>
          <DesktopVersion
            athlete={this.state.athlete}
            setAthlete={this.setAthlete.bind(this)}
            athlete_data={this.state.athlete_data}
            athlete_pbs={this.state.athlete_pbs}
            athlete_accolades={this.state.athlete.accomplishments}
            loadingNewAthlete={this.state.loadingNewAthlete}
            setAthleteFromTopCompetitors={this.setAthleteFromTopCompetitors.bind(
              this,
            )}
            similar_athletes={this.state.similar_athletes}
          />
        </div>
      );
    } else {
      return (
        <div className={styles.mobileMain}>
          <MobileVersion
            athlete={this.state.athlete}
            setAthlete={this.setAthlete.bind(this)}
            athlete_data={this.state.athlete_data}
            athlete_pbs={this.state.athlete_pbs}
            athlete_accolades={this.state.athlete.accomplishments}
            loadingNewAthlete={this.state.loadingNewAthlete}
            setAthleteFromTopCompetitors={this.setAthleteFromTopCompetitors.bind(
              this,
            )}
          />
        </div>
      );
    }
  }
}
