## Athletics Hub

https://github.com/colinfitzgerald328/athletics-hub/assets/64982557/f076a4e9-28d4-483f-899f-ebe6a65938d1

The goal of this project was to build an easily accessible page for track and field fans to follow their favorite athletes. This page was built with the track fan in mind.
Currently, the project only supports the top 20 men and women track and field athletes based on world rankings from 2023.

### The Project

When you search for an athlete, you want to know a couple of things:

1. What are this athlete's main events?
2. What are this athlete's most recent results?
3. What's the backstory of this athlete?

- While this information is available in a google search, myself and others commonly find that the auto-generated summaries from Wikipedia are too short and there is no live results stream available. While the information is available, it is not tailored to a track fan's use case.

- This project involves generating descriptive summaries by utilizing data from Instagram and Wikipedia profiles of athletes. The process includes extracting information from these sources and then employing generative language models to generate coherent and well-written summaries.

- Key features of the project include the ability to access a live stream displaying the athlete's most recent results, a summary of the athlete and their accomplishments, as well as links to their social media profiles.

### Credit

- Credit to Instagram, Wikipedia, and WorldAthletics for providing the data used in creating these summaries and results stream.
- The technical stack utilized for this project includes NoSQL databases, specifically MongoDB, a Python Flask server for handling data, and Next.js/Vercel for hosting the website.
