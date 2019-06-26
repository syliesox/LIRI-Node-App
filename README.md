# LIRI NodeJS App

## Description 

LIRI App is a CLI (Command Line Interface) App built using NodeJS, and utilizes many NPM packages and APIs. The App allows users to enter in a command, and a search parameter to display specific results based on the command.

#### The available **commands** and *display results* are:
- **concert-this**
    - *Venue Name*
    - *Venue Location*
    - *Date and Time of Event*
- **spotify-this-song**
    - *Artist(s)*
    - *Song's Name*
    - *Song's Album*
    - *A preview link to a Spotify sound-clip of the song*
- **movie-this**
    - *Title of movie*
    - *Year movie came out*
    - *IMDB Rating of the movie*
    - *Rotten Tomatoes Rating of the movie*
    - *Country where movie was produced*
    - *Language*
    - *Plot*
    - *Actors in the movie*
- **do-what-it-says**
    Takes the text within the 'random.text' file, and uses it to call one of LIRI's commands

[LIRI App walkthrough video](https://drive.google.com/open?id=1N44S0YhWbEW4ttGsdHA3-cIZZ32wtwQT)

## Link
 LIRI App is a CLI App, so there is no deployment to Github or Heroku.

## Technologies Used

##### Framework
  - NodeJS

##### NPM Packages used
  - dotenv (to protect keys)
  - axios (to make http requests from NodeJS)
  - momentJS (to format date and time outputs)
  - Spotify (to pull song info)

##### APIs used
  - Bands in Town
  - OMDB
  - Spotify (available via NPM package)

