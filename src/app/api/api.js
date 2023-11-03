var API_URL = "https://python.colinfitzgeral8.repl.co"

export async function getResultsForAthlete(athlete_code, callback) {
    var data = {
        athlete_id: athlete_code
    };
  
    // hello world
  
    var url = new URL(API_URL + "/query/athletes");
    url.search = new URLSearchParams(data).toString();
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then((data) => {
        // TODO Fill in Data
        callback(data);
      })
      .catch((error) => {
        // toaster.danger("API Error on getting notifications");
      });
  }