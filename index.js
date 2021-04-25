const express = require('express')
const app = express()
const port = 3000;
const https = require('https');
const env = require("dotenv");
env.config();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.post("/", (req, res) => {
    const city = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + process.env.API_KEY + "&units=metric";

    https.get(url, (response) => {
      console.log(response.statusCode);
    
        response.on('data', (data) => {
          parsedData = JSON.parse(data);
          console.log(parsedData);
          const imgUrl = "http://openweathermap.org/img/wn/" + parsedData.weather[0].icon + "@2x.png"
          res.write('<p>Temperature: ' + Math.round(parsedData.main.temp) + '&deg; Celsius</p>');
          res.write('<img src=' + imgUrl + '>');
          res.end();
        });
    
    }).on('error', (e) => {
      console.error(e);
    });

})



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})