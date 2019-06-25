// Required NPM Packages
require("dotenv").config();

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");

// User inputs
// The command the user has chosen
var command = process.argv[2];
// What the user wants to search with the command
var search = process.argv[3];


concert-this

spotify-this-song

movie-this

do-what-it-says
