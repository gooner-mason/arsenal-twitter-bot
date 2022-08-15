const express = require("express")
const path = require('path');

const { job1, job5, job9, job13, job17 } = require("./src/twitterBotJob.js");

const app = express();

app.get("/", (req, res) => {
	res.send("Check out @Gooner_Bot on Twitter")
	job1.start()
	job5.start()
	job9.start()
	job13.start()
	job17.start()
})

app.listen(process.env.PORT || 3000, () => {
	console.log("Server running on port 3000")
})