// Required NPM Packages
require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");

// Get Spotify keys that are stored in the keys.js file
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

// User inputs
// The command the user has chosen
var command = process.argv[2];
// What the user wants to search with the command, grabs everything typed after the command
var search = process.argv.slice(3).join(" ");

runLIRI(command, search);

// Setting up the command structure
function runLIRI(command, search) {
    if (command === "concert-this") {
        concertInfo(search);
    } else if (command === "spotify-this-song") {
        songInfo(search);
    } else if (command === "movie-this") {
        movieInfo(search);
    } else if (command === "do-what-it-says") {
        doWhatItSays(search);
    } else {
        console.log("Command requested unknown to LIRI. Pick a proper LIRI command: ")
        console.log("concert-this");
        console.log("spotify-this-song");
        console.log("movie-this");
        console.log("do-what-it-says");
    };
}

function concertInfo(search) {
    var queryURL = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(function(response) {
        var results = response.data;
        if (results !== undefined) {
            // console.log(results);
            console.log("===============================")
            console.log("Upcoming events for '" + search + "'");
            for (var i = 0; i < results.length; i++) {
                var concert = results[i];
                // console.log(concert);
                console.log("===============================")
                console.log("Venue: " + concert.venue.name + ",");
                console.log("Location: " + concert.venue.city + ", " + concert.venue.region);
                console.log("Date: " + moment(concert.datetime).format("MM/DD/YYYY"));
                if (moment(concert.datetime).hour() >= 12) {
                    var time = moment(concert.datetime).hour();
                    var newTime = time - 12;
                    console.log("Time: " + newTime + " PM");
                } else if (moment(concert.datetime).hour() = 12) {
                    console.log("Time: " + (moment(concert.datetime).hour()) + " PM");
                } else {
                    console.log("Time: " + (moment(concert.datetime).hour()) + " AM");
                }
                console.log("===============================")
            };
        } 
    }).catch(function() {
        console.log("No events found for '" + search + "'. Try again!")
    });
}

function songInfo(search) {
    spotify.search({
        type: "track",
        query: search,
        limit: 5
    }).then(function(response) {
        var results = response.tracks.items;

        if (results.length !== 0) {
            console.log("===============================");
            console.log("RESULTS for '" + search + "'");
            for (var i = 0; i < results.length; i++) {
                console.log("===============================");
                console.log("Artist: " + results[i].artists[0].name);
                console.log("Song Name: " + results[i].name);
                console.log("Album: " + results[i].album.name);
                console.log("Preview Song: " + results[i].preview_url);
                console.log("===============================");
            }
        } else {
            songInfo("The Sign, Ace of Base");
        };
    })
}

function movieInfo(search) {
    var queryURL = "http://www.omdbapi.com/?t=" + search + "&y=&plot=full&tomatoes=true&apikey=trilogy";
    
    axios.get(queryURL).then(function(response) {
        var results = response.data;
        
        if (results.Response === "False") {
            movieInfo("Mr. Nobody");
        } else {
            console.log("===============================");
            console.log("Results for '" + search + "'");
            console.log("===============================");
            console.log("Title: " + results.Title);
            console.log("Year: " + results.Year);
            console.log("IMDB Rating: " + results.imdbRating);
            console.log("Rotten Tomatoes Rating: " + results.Ratings[1].Value);
            console.log("Country: " + results.Country);
            console.log("Language(s): " + results.Language);
            console.log("Plot: " + results.Plot);
            console.log("Actors: " + results.Actors);
            console.log("===============================");
        }
        
    }).catch(function(error) {
        console.log(error);
      });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            console.log("Error: " + error);
        }

        var dataSplit = data.split(",");
        console.log(dataSplit);
        command = dataSplit[0].trim();
        search = dataSplit[1].trim().replace(/"|'/g, "");
        
        runLIRI(command, search);

        // To test run in random.txt file:
        // movie-this, "13 Going on 30"
        // concert-this, "Maroon 5"
        // spotify-this-song, "I Want it That Way"

    })
}



