var Twit = require('twit');
const express = require('express');
var SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(express.json())

var bool = true;

require('dotenv').config();

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    accessToken: process.env.SPOTIFY_ACCESS_TOKEN
})

var twitterApi = new Twit({
    consumer_key: process.env.CONSUMER_KEY,  
  
    consumer_secret: process.env.CONSUMER_SECRET,    
    access_token: process.env.ACCESS_TOKEN,  

    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})

    spotifyApi.getMyCurrentPlayingTrack()
    .then((data)=>{
        postMusicOnTwitter('Hey! Agora eu estou ouvindo: \n' + JSON.stringify(data.body.item.name) + ' - ' + JSON.stringify(data.body.item.artists[0].name) + "\n Bora ouvir também?");
    }).catch((err) => {
        console.log("Error:" + err)
    })

    function postMusicOnTwitter(post){
        twitterApi.post(
            'statuses/update',
            {status:post},
            (err, data, res) => {
                if(err){
                    console.log("ERROR: " + err);
                    return false;
                }
    
                console.log("Tweet feito com sucesso!");
            }
        )
    }

    app.listen(4002, ()=> console.log("Servidor rodando na porta 4002") )
   

   

