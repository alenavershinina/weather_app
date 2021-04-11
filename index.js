const express = require('express')
const app = express()
const port = 3000;
const https = require('https');
const bodyParser = require('body-parser');
const env = require("dotenv");
env.config();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }))

app.post("/", (req, res) => {
    const city = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + process.env.API_KEY;

    https.get(url, (response) => {
      console.log(response.statusCode);
    
        response.on('data', (data) => {
            res.send(JSON.parse(data));
        });
    
    }).on('error', (e) => {
      console.error(e);
    });

})



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})