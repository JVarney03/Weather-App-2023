import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

import {apiKey} from "./secrets.mjs";




//API Info

const apiCoordsUrl = "http://api.openweathermap.org/geo/1.0/direct"
const apiWeatherUrl = "https://api.openweathermap.org/data/2.5/weather"




//set up app
const app = express();
const port = 3000;

const icons = {Thunderstorm: "thunderstorm", Drizzle: "rainy", Rain: "rainy", Snow: "cloudy snowing", Clear: "sunny", Clouds: "cloud" }







//Middleware
var lat = 0
var lon = 0


//Converst city to lat and lon coordinates to be passed to weather API
async function  getLongLat  (req, res, next) {
    //Try get coords
    try {
        const response = await axios.get(apiCoordsUrl,
            {
                params: {
                   q: req.body.city,
                   appid: apiKey
                }
            });
        //record coords to be used in weather request
        lat = response.data[0].lat;
        lon = response.data[0].lon;

    } catch(error) {
        console.error("Failed to make request :", error.message);
    }
    
    next();
}


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));









//Requests

app.get("/", (req,res) => {
    res.render("index.ejs",);
})


//Middleware placed here to avoid being used on page load
app.use(getLongLat);


app.post("/", async (req,res) => {
    //Try get weather info
    try {
        const result = await axios.get(apiWeatherUrl, 
            {
            params: {
                lat: lat,
                lon: lon,
                appid: apiKey
            }
        });


        //Convert kelvin to degrees celsius
        const temperature = Math.round(result.data.main.temp - 273.15)
        console.log(result.data.weather[0].main)

        res.render("index.ejs", 
        {
            city: req.body.city,
            icon: icons[result.data.weather[0].main],
            temp: temperature,
            description: result.data.weather[0].description
        });
    } catch(error) {
        console.log("Failed to make request :", error.message);
    }
    
});







app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})