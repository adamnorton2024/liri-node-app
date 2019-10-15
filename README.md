# liri-node-app

# Purpose 
This app is meant to help you quickly and easily find information about concerts, movies, specifics songs and your favorite artists.  This help helps you find content and events to satisfy all of your entertainment needs. 

# To Use
In order to use these app, you will need your own Spotify API keys.  Create a .env file, and enter the following code into it:

SPOTIFY_ID="Your Spotify ID"
SPOTIFY_SECRET="Your Spotify Secret Code"

# Commands 
This app only has 4 commands, which makes it very easy to use.  From your command line, type any of the following:

* node liri.js concert-this "artist/band name here"
    * This will list all upcoming events featuring this artist.  You can see location, dates, and times.
    
* node liri.js spotify-this-song "song name here"
    * This will find all the information about the track you list, including a link from which you can play a 30 second preview track. 
    * There are many songs with the same or similar names, it will list them all so you can find the version you're looking for. 

* node liri.js movie-this "movie name here"
    * This will find and display info related to the movie title you list. 

* node liri.js "do-what-it-says"
    * This will access the infomation contained in the random.txt file and use it in the search.  If you'd like to change the search terms, feel free to edit the random.txt file to your preference. 


# Technologies Used

* Axios
* Spotify API
* Bands In Town API
* OMDB API
* Moment-js

# Video

Please view the video called "video-liri-demo.mp4" to see the app in use. 
