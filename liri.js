require("dotenv").config();
var axios = require("axios");
var moment = require('moment');
Spotify = require("node-spotify-api");

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var nodeArg = process.argv;
var name = nodeArg.slice(3).join("+");
//console.log(name);
var command = nodeArg[2];
//console.log(command);

switch (command) {
    case "concert-this":
        concert(name);
        break;
    case "spotify-this-song":
        spotifyThis(name);
        break;
    case "movie-this":
        movie(name);
        break;
    case "do-what-it-says":
        random();
        break;
    default:
        console.log("User Error! Must use one of the following commands:");
        console.log('"concert-this"');
        console.log('"spotify-this-song"');
        console.log('"movie-this"');
        console.log('"do-what-it-says"');
        break;
}

function concert(artist){
    console.log("Get Concert Data");
};

function spotifyThis(song){
    console.log("Get Spotify Data");
};

function movie(title){
    console.log("Get Movie Data");
    var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy"

    axios.get(queryUrl).then(
        function (response) {
            console.log("===========================================");
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
};

function random(){
    console.log("Do Random Stuff");
};
