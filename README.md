## Athletics Hub - V1 

Athletics hub V1 has been designed and the beta is now available at the following link! https://athletics-hub-v1.vercel.app. As it is still in beta, there may be design flaws or bugs that you run into. If you do, feel free to shoot me an email: colinfitzgerald328@gmail.com :) 

With V1 we introduce *2* new experimental features: **Head to Head** and **Collections**

With head to head, you are able to add athletes to a display where you can compare their personal bests side by side. It is likely that we will build an analytical and informative feature on top of this that can predict who would win/ some sort of virtual competitions. 

![Screenshot 2023-12-14 at 7 14 12 PM](https://github.com/colinfitzgerald328/athletics-hub/assets/64982557/3fd1b9a6-932f-412b-b87f-6c05233a0f00)


With **Collections**, you can now create groups of your favorite athletes. The goal of this feature is for you to be able to organize the athletes you follow throughout the season for quick access and to stay up to date. 

![Screenshot 2023-12-14 at 7 18 30 PM](https://github.com/colinfitzgerald328/athletics-hub/assets/64982557/b01c5937-25d4-4153-bc65-d4ac66e5f7a0)


<img width="1171" alt="Screenshot 2023-12-04 at 6 04 03 PM" src="https://github.com/colinfitzgerald328/athletics-hub/assets/64982557/b253dee8-b0c5-427b-bd9d-be2c8dfdae6a">


## Athletics Hub - V0 

https://github.com/colinfitzgerald328/athletics-hub/assets/64982557/47b1014f-f1f6-4ffb-a94a-6855fcca4aad

### Goal

Athletics Hub is a comprehensive platform designed with the track fan in mind. Our goal is to create an all-in-one hub for track and field enthusiasts to stay connected with the sport throughout the season. Currently, we have indexed the top 1000 male and female athletes globally and have plans to expand this coverage to include all potential competitors in the Paris 2024 Olympics.

### The Project

When searching for an athlete, Athletics Hub aims to provide answers to key questions:

1. What are this athlete's main events?
2. What are this athlete's most recent results?
3. What's the backstory of this athlete?
4. Who are the athlete's top competitors?
5. What are this athlete's personal bests?
6. What are this athlete's most notable accomplishments?

While this information is available through a Google search, our project addresses common issues such as short auto-generated summaries, the lack of a live results stream, and information not tailored to a track fan's desires. This involves generating descriptive summaries by utilizing data from Instagram and Wikipedia profiles, which are then fed into generative language models, resulting in coherent and well-written summaries. Additionally, we collect and display data from World Athletics in a visual format for easy tracking of your favorite athletes.

### Key Features

- Live stream displaying the athlete's most recent results
- Athlete summary with personal bests and accolades
- List of the athlete's top 3 competitors
- Links to social media profiles (Instagram and Twitter)
- Performance graph for the current year


### Challenges Addressed

- **Scalability:** Devised and implemented efficient scaling strategies to optimize system performance, carefully balancing database storage and app engine instance memory usage.
- **Cost Optimization:** Conducted thorough exploration across multiple cloud service providers to manage and curtail system expenses, ensuring that the system can run for free. 
- **Error Management:** Implemented an exhaustive logging system within the virtual machine to actively monitor system health, swiftly identify potential issues, and mitigate code failures.
- **Enhancing Page Load Speed:** Initially encountered prolonged page loading times due to real-time data retrieval. Subsequently overhauled the system architecture to enable data streaming and updates at intervals via a virtual machine. This transformation significantly reduced athlete data retrieval times from approximately 2 seconds to an impressive ~170ms.


### Key Accomplishments

- Successful redesign achieving a significant reduction in athlete data retrieval time.
- Ongoing efforts to further optimize athlete result fetch times and improve query efficiency for stored embeddings (leveraging Pinecone indexing).

The project now operates more efficiently, effectively balancing costs while significantly enhancing performance.

### Credit

- Special thanks to Instagram, Wikipedia, and World Athletics for providing the data that supports this project.
- Technical stack: NoSQL (MongoDB), Pinecone Database for storing vector embeddings, Flask Server on Google App Engine, Amazon EC2 Micro-VM, Next.js/Vercel for hosting and deployment.
