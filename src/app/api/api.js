var API_URL = "https://python.colinfitzgeral8.repl.co";

export async function getResultsForAthlete(athlete_code, callback) {
  var data = {
    athlete_id: athlete_code,
  };

  // hello world

  var url = new URL(API_URL + "/athletes/results");
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

export async function getSearchResultsForQuery(search, callback) {
  var data = {
    search_term: search,
  };

  // hello world

  var url = new URL(API_URL + "/query/results");
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

export async function getRandomDoc(callback) {
  var url = new URL(API_URL + "/query/random");
  url.search = new URLSearchParams().toString();
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

export async function getTopRecords(callback) {
  var url = new URL(API_URL + "/query/top");
  url.search = new URLSearchParams().toString();
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


export async function getPBSForAthlete(athlete_code, callback) {
  var data = {
    athlete_id: athlete_code,
  };

  // hello world

  var url = new URL(API_URL + "/athlete/pbs");
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

export async function getAccoladesForAthlete(url_slug, callback) {
  var data = {
    url_slug: url_slug,
  };

  // hello world

  var url = new URL(API_URL + "/athlete/accolades");
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

///query/top
