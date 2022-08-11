const express = require("express")
const path = require('path');

const { job1, job3, job5, job7, job9, job11, job13, job15, job17 } = require("./src/twitterBotJob.js");

const app = express();

app.get("/", (req, res) => {
	res.send("Check out @Gooner_Bot on Twitter")
	job1.start()
	job3.start()
	job5.start()
	job7.start()
	job9.start()
	job11.start()
	job13.start()
	job15.start()
	job17.start()
})

app.listen(process.env.PORT || 3000, () => {
	console.log("Server running on port 3000")
})