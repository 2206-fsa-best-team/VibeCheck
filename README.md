<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/2206-fsa-best-team/VibeCheck">
    <img src="public/check_512.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">vibe check</h3>

  <p align="center">
    A journaling app including both long and short-form journaling as well as charts so you can check your vibe over time.
    <br />
    <a href="https://github.com/2206-fsa-best-team/VibeCheck"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://youtu.be/ZkAHRSJC-rw">View Demo</a> (coming soon)
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<img src="https://user-images.githubusercontent.com/4291769/187789455-2fa67718-96a7-4736-ba07-c35510d03090.png" width="225" height="400" />

Our team wanted to build an app that allowed us to check in on our own experiences throughout the day (via short-form journaling) and provide a platform for longer form journal entries to let us reflect on a broader time period. As a result, vibe check was born.

Our goals:
* Enable short-form journaling and a small "vibe check" for users to quickly enter in how they're feeling in the moment and keep living their life
* Create an intuitive long-form journaling experience for those times when you have more to reflect on (e.g., at the end of the day, every few days, or each week)
** This includes accounting for an offline experience where users might have written down their journal and wanted to upload it to the platform by taking a picture of it
* Reflect on the vibe rating you provided over time and see which journal entries or moments had more positive or negative vibes associated with them


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This project was built using a variety of frameworks and tools, but we will focus on the main ones below:

* [![React][React.js]][React-url]
* ![image](https://img.shields.io/badge/-Chakra_UI-teal?style=for-the-badge)
* ![image](https://img.shields.io/badge/-Supabase-green?style=for-the-badge)
* ![image](https://img.shields.io/badge/-HTML/CSS-orange?style=for-the-badge)
* ![image](https://img.shields.io/badge/-Google_Cloud_Vision-darkblue?style=for-the-badge)
* ![image](https://img.shields.io/badge/-Heroku-purple?style=for-the-badge)
* ![image](https://img.shields.io/badge/-Node.js-green?style=for-the-badge)
* ![image](https://img.shields.io/badge/-PostgreSQL-blue?style=for-the-badge)
* ![image](https://img.shields.io/badge/-express-grey?style=for-the-badge)
* ![image](https://img.shields.io/badge/-Recharts-lightblue?style=for-the-badge)



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:2206-fsa-best-team/VibeCheck.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the following command to build the app
   ```sh
   npm run start
   ```
4. Navigate to localhost:8080 on your browser (note: you will not be able to access Google Cloud Vision running the app locally)
5. Log in with the following demo credentials or enter your own credentials and sign up
    Email: amaan.lakhani5+8@gmail.com
    Password: 123456
    
6. Enjoy!
    

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

### Installing the app

Tap on the install to home screen button on the bottom of your screen

<img src="https://user-images.githubusercontent.com/4291769/187952940-9c13d7d0-5b5b-40e8-9ec3-797ae2411b99.png" width="225" height="400" />

Confirm the installation

<img src="https://user-images.githubusercontent.com/4291769/187952894-7743c9c7-f8d3-4766-a02e-8ed4c151fd68.png" width="225" height="400" />

Navigate to the app from your home screen and open the app

<img src="https://user-images.githubusercontent.com/4291769/187953132-6c78f017-8f1b-4a38-9219-e4ef4c2f8620.png" width="225" height="400" />

You're all set!

### Adding a Moment
<img src="https://user-images.githubusercontent.com/4291769/187954448-83686a62-3d31-4a93-b18e-4a10d2f4c6c1.png" width="225" height="400" /> <img src="https://user-images.githubusercontent.com/4291769/187954448-83686a62-3d31-4a93-b18e-4a10d2f4c6c1.png" width="225" height="400" /> <img src="https://user-images.githubusercontent.com/4291769/187954487-bfc0d64b-8faa-42db-b40d-ed5cbb01969a.png" width="225" height="400" />

### Adding a Journal Entry

<img src="https://user-images.githubusercontent.com/4291769/187959813-009f50f8-498a-42c3-9014-716084896f13.png" width="225" height="400" /> <img src="https://user-images.githubusercontent.com/4291769/187959885-95c435fa-82e7-4298-aaeb-d66309c5a8c3.png" width="225" height="400" /> <img src="https://user-images.githubusercontent.com/4291769/187959919-c937232c-a74c-47f9-9164-f231d05f381a.png" width="225" height="400" /> <img src="https://user-images.githubusercontent.com/4291769/187959942-59521fbf-d0b1-4420-8ff0-b6a6be7ff352.png" width="225" height="400" /> <img src="https://user-images.githubusercontent.com/4291769/187959857-ba0fcecd-cf86-40ef-93f1-39acf0c74883.png" width="225" height="400" /> 

### Adding a Journal Entry via written document
<img src="https://user-images.githubusercontent.com/4291769/187961500-834bbcc1-b684-4f21-9834-bb31e5d203f4.png" width="225" height="400" /> <img src="https://user-images.githubusercontent.com/4291769/187961613-72142550-a649-49dc-9147-7e78956d3e09.png" width="225" height="400" /> <img src="https://user-images.githubusercontent.com/4291769/187961595-a591ef6f-2861-43ab-bdda-2bab5aea7a87.png" width="225" height="400" /> <img src="https://user-images.githubusercontent.com/4291769/187961525-c7e96c24-c933-4b27-9ebe-e54136676e9c.png" width="225" height="400" /> <img src="https://user-images.githubusercontent.com/4291769/187961515-d38e564f-4718-4abf-8df7-f75fe23e314d.png" width="225" height="400" /> 


### Viewing your vibes over time
<img src="https://user-images.githubusercontent.com/4291769/187962838-7144de1a-3369-4be9-962f-ac55f6e36605.png" width="225" height="400" /> <img src="https://user-images.githubusercontent.com/4291769/187965727-9bb44f2c-66ba-4c99-9c60-13a03f6ba30e.png" width="225" height="400" /> <img src="https://user-images.githubusercontent.com/4291769/187964182-fa5c9e05-c4c2-4267-ade5-319786d29866.png" width="225" height="400" />


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Proof of Concept
* Create a Progressive Web Application in React✔
* Connect the app to Supabase ✔
* Enable Authentication via Supabase ✔
* Set up a PostgresQL database ✔
* Display all moments and individual moments ✔
* Add new moments ✔
* Set up navigation for moments and journal entries ✔

## MVP
* Display all journal entries and individual journal entries ✔
* Add all journal entries ✔
* Edit / Delete moments and journal entries ✔
* Secure routes and reading moments / journal entries for each user ✔
* Enable camera usage in app ✔
* Enable camera capture of written journal entries using Google Cloud Vision ✔
* Highlight low-confidence words from written journal entries ✔
* Create charts based on vibe data for moments and journal entries ✔
* Enable filtering for moments and journal entries ✔
* Enhance responsiveness throughout all components to account for desktop and mobile usage ✔
* Deploy the app via Heroku (later Render) ✔
* Enable continuous integration using Heroku (later Render) and Github ✔

## Long-term Vision
* Implementing NLP and incorporating sentiment analysis into the vibe values
* Graphing NLP sentiment analysis over time
* Provide more informed analyses of what trigger words are associated with "good" or "bad" vibes



<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Amaan Lakhani - [Github](https://github.com/alakhani5) - [LinkedIn](https://www.linkedin.com/in/amaanlakhani/) - [Email](amaan.lakhani5@gmail.com)

Daniel Jacobson - [Github](https://github.com/danielyj98) - [LinkedIn](https://www.linkedin.com/in/danielj98/) - [Email](Danielyjacobson@gmail.com)

Evan Forde Barden - [Github](https://github.com/evanfordebarden) - [LinkedIn](https://www.linkedin.com/in/evanfordebarden/) - [Email](hello@evanfordebarden.com)

Nicholas Angelopoulos - [Github](https://github.com/NickyAngel) - [LinkedIn](https://www.linkedin.com/in/nickyangel/) - [Email](neangelopoulos@gmail.com) 

Project Link: [vibe check](https://github.com/2206-fsa-best-team/VibeCheck)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments 

* [Chakra UI](https://chakra-ui.com/)
* [Recharts](https://recharts.org)
* [Google Cloud Vision](https://cloud.google.com/vision)
* [Heroku](https://id.heroku.com/login)
* [Render](https://render.com/)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
