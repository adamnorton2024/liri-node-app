// setup all the required external links
require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var moment = require('moment');
Spotify = require("node-spotify-api");

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

// grab command line arguments and save them as variables. 
var nodeArg = process.argv;
var name = nodeArg.slice(3).join("+");
//console.log(name);
var command = nodeArg[2];
//console.log(command);

liriControl(); // call function that decides which command to execute by calling the correct funtion

function liriControl(){
    switch (command) {
        case "concert-this":
            concert(name);
            break;
        case "spotify-this-song":
            if (!name) {
                name = "Ace of Base The Sign US Album [Remastered]";
            }
            spotifyThis(name);
            break;
        case "movie-this":

            // if no movie name was given, then use Mr. Nobody.
            if (!name) {
                name = "Mr. Nobody";
            }
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
};




function concert(artist){
    // setup query for requested concert data
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function (response) {
            // loop through all the responses to list out all upcoming concerts
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
   //console.log("Get Spotify Data");
    //console.log("Song is: " + song);
        // call for spotify song by name
        spotify
            .search({ type: 'track', query: song })
            .then(function (response) {

                
                var songData = response.tracks.items;

                // case of if they didn't specify a song.
                if (song === "Ace of Base The Sign US Album [Remastered]"){
                    console.log("Should only be one song");
                    console.log("===========================================")
                    console.log(" ");
                    console.log("Artist(s): " + songData[0].artists[0].name);
                    console.log("Song Name: " + songData[0].name);
                    console.log("Album Name: " + songData[0].album.name);
                    console.log("Preview Link: " + songData[0].preview_url);
                    console.log(" ");
                } else {
                    // list all songs with same or similar name
                    for (let i = 0; i < songData.length; i++) {
                        console.log("===========================================")
                        console.log(" ");
                        console.log("Artist(s): " + songData[i].artists[0].name);
                        console.log("Song Name: " + songData[i].name);
                        console.log("Album Name: " + songData[i].album.name);
                        console.log("Preview Link: " + songData[i].preview_url);
                        console.log(" ");
                    }
                };

                
            })
            .catch(function (err) {
                console.log(err);
            });

};

function movie(title){
    //console.log("Get Movie Data");
    var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";
    // request information based on movie title given
    axios.get(queryUrl).then(
        // list movie info
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
    //console.log("Do Random Stuff");
    // if this function is run, it'll read the random.txt file for what to use as the commands.
    fs.readFile("random.txt", "utf8", function(error, data) {

        if(error){
            return console.log(error);
        };

        //console.log(data);
        // saving data from random.txt, splitting it at the comma, and saving into an array. 
        var dataArr = data.split(",");

        // change these variables to match data saved into dataArr.
        command = dataArr[0];
        name = dataArr[1];

        // run the switch statement again to retrieve the wanted info. 
        liriControl();
    });
};
