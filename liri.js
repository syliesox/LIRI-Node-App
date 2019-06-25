// Required NPM Packages
require("dotenv").config();

var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");

// User inputs
// The command the user has chosen
var command = process.argv[2];
// What the user wants to search with the command, grabs everything typed after the command
var search = process.argv.slice(3).join(" ");

if (command === "concert-this") {
    concertInfo();
} else if (command === "spotify-this-song") {
    songInfo();
} else if (command === "movie-this") {
    movieInfo();
} else if (command === "do-what-it-says") {
    commandInfo();
} else {
    console.log("Command requested unknown to LIRI. Pick a proper LIRI command.")
};

function concertInfo() {
    var queryURL = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(function(response) {
        var results = response.data;

        if (results.length !== 0) {
            console.log("===============================")
            console.log("Upcoming events for " + search);
            for (var i = 0; i < results.length; i++) {
                var concert = results[i];
                console.log(concert.venue.name + ",");
                console.log(concert.venue.city + ", " + concert.venue.region);
                console.log(moment(concert.datetime).format("MM/DD/YYYY"));
                console.log("===============================")
            };
        } else {
            console.log("No events found for " + search + ". Try again!")
        }
    })
}


