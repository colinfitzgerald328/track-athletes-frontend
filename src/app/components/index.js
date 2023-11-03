import React from "react";
import * as API from "src/app/api/api.js";
import AthleteResults from "./1_AthleteResults";
import styles from "./styles.module.css";

export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      athlete: [],
    };
  }

  getResultsForAthlete(athlete_id) {
    API.getResultsForAthlete(athlete_id, (results) => {
      console.log(results);
      this.setState({
        athlete: results["athlete_data"],
      });
    });
  }

  componentDidMount() {
    this.getResultsForAthlete("14595214");
  }

  render() {
    function separateSentencesIntoParagraphs(text) {
      // Split the text into sentences using regular expressions.
      const sentences = text.split(/(?<=[.!?])\s+/);
    
      // Join the sentences to create separate paragraphs.
      const paragraphs = sentences.map((sentence) => `<p style="margin-bottom: 10px; margin-right: 10px;">${sentence}</p>`);
    
      // Join the paragraphs to create the final result.
      return paragraphs.join('\n');
    }
    const formattedText = separateSentencesIntoParagraphs("Gudaf Tsegay Desta is an Ethiopian middle- and long-distance runner who has achieved remarkable success in her career. She currently holds the world record in the 5000-meter race, with an impressive time of 14:00.21. This record was set at the Prefontaine Classic, the final Diamond League event in 2023, held in Eugene, Oregon. Gudaf also proved her dominance in the World Athletics Championships, winning the gold medal in the 5000 meters in 2022, and the gold medal in the 10,000 meters in 2023. She has consistently performed well in these championships, earning a bronze medal in the 1500 meters in 2019 and a silver medal in 2022. Gudaf's exceptional talent was evident even at a young age, as she set the world's fastest under-18 mark in the indoor 1500 meters in 2014. She has also had success in various distances, achieving top rankings and setting meeting records in both indoor and outdoor competitions. Gudaf is known for her consistent and fast lap times during races, and her versatility as a runner is truly commendable. She proudly represents Ethiopia in international competitions and hails from the Tigray Region in northern Ethiopia. Gudaf's incredible performances have earned her nominations for the World Athlete of the Year award, and she is supported by her sponsor Nike and the Pinedasport team. Her strong presence on social media allows fans to keep up with her training and competition updates. Gudaf Tsegay Desta is undoubtedly a force to be reckoned with in the world of middle- and long-distance running.");
    return (
      <div className={styles.main}>
        <div className={styles.mainBackground}>
          <div className={styles.mainImage}>
            <img className={styles.athleteImage} src="https://media.gettyimages.com/id/1691564244/photo/eugene-oregon-gudaf-tsegay-of-ethiopia-wins-the-womens-5000m-setting-a-new-world-record.jpg?s=612x612&w=0&k=20&c=HLf0tZVcfmVa9UWHLsYED2ytFz6kkZjKZEzZVub-tNA=" />
          </div>
          <div className={styles.mainText}>
            <div className={styles.container}>
              <div className={styles.mainTitle}>
                <div>
                  Gudaf Tsegay
                </div>
                <div className={styles.mainEvents}>
                  Marathon, 1500 Metres, 5000 Metres
                </div>
              </div>
              <div className={styles.rightContainer}>
                <div className={styles.openLink}>Read more</div>
                <div className={styles.socialIconHolder}>
                  <img className={styles.image} src="https://worldathletics.org/static/facebook.svg" />
                  <img className={styles.image} src="https://worldathletics.org/static/instagram.svg" />
                  <img className={styles.image} src="https://worldathletics.org/static/twitter.svg" />
                </div>
              </div>
            </div>
            <div className={styles.mainSummary} dangerouslySetInnerHTML={{ __html: formattedText }} />
          </div>
          <AthleteResults
            athlete={this.state.athlete}
          />
        </div>
      </div>
    )
  }
}
