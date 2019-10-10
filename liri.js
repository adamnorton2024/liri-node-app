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
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function (response) {

            //console.clear();
            // artist = artist.replace(/+/g, ' ');
            console.log(response.data);
            for (let i = 0; i < response.data.length; i++) {
                console.log("=================================");
                console.log(" ");
                console.log("Lineup: " + response.data[i].lineup);
                console.log("Venue: " + response.data[i].venue.name);
                console.log("Location: " + response.data[i].venue.city, response.data[i].venue.region);
                console.log("Date / Time: " + moment(response.data[i].datetime).format("MM-DD-YYYY, hh:mm"));
                console.log(" ");
            };
        })

        .catch(function (error) {
            if (error.response) {
            console.log(error.message);
            };
        }
    )};

function spotifyThis(song){
    console.log("Get Spotify Data");
};

function movie(title){
    console.log("Get Movie Data");
    var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            console.clear();
            console.log("===========================================");
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            if (!JSON.stringify(response.data.Ratings[1].Value)){
                console.log("Rotten Tomatoes Rating: N/A");
            } else {
                console.log("Rotten Tomatoes Rating: " + JSON.stringify(response.data.Ratings[1].Value));
            };
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
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
