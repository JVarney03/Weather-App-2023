import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

<<<<<<< HEAD
=======
import {apiKey} from "./secrets.mjs";

//API Info

const apiCoordsUrl = "http://api.openweathermap.org/geo/1.0/direct"
const apiWeatherUrl = "https://api.openweathermap.org/data/2.5/weather"

>>>>>>> 0142dfd (Fixed data breach)
//set up app
const app = express();
const port = 3000;

<<<<<<< HEAD
=======
//Middleware
var lat = 0
var lon = 0

async function  getLongLat  (req, res, next) {
    try {
        const response = await axios.get(apiCoordsUrl,
            {
                params: {
                   q: req.body.city,
                   appid: apiKey
                }
            });
        // const lat = response.data.lat;
        // const lon = response.data.lon;
        lat = response.data[0].lat;
        lon = response.data[0].lon;

    } catch(error) {
        console.error("Failed to make request :", error.message);
    }
    
    next();
}


>>>>>>> 0142dfd (Fixed data breach)
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Requests

app.get("/", (req,res) => {
    res.render("index.ejs");
})



<<<<<<< HEAD
=======
app.use(getLongLat);

app.post("/", async (req,res) => {
    try {
        const result = await axios.get(apiWeatherUrl, 
            {
            params: {
                lat: lat,
                lon: lon,
                appid: apiKey
            }
        });

        console.log()
    } catch(error) {
        console.log("Failed to make request :", error.message);
    }
    res.render("index.ejs", {city: "London"});
});

>>>>>>> 0142dfd (Fixed data breach)






app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})