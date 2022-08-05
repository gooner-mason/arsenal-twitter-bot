const express = require("express")
const path = require('path');

const { job1, job2, job3, job4, job5, job6, job7, job8, job9 } = require("./src/twitterBotJob.js");

const app = express();

app.get("/", (req, res) => {
	res.send("Check out @Gooner_Bot on Twitter")
	job1.start()
	job2.start()
	job3.start()
	job4.start()
	job5.start()
	job6.start()
	job7.start()
	job8.start()
	job9.start()
})

app.listen(process.env.PORT || 3000, () => {
	console.log("Server running on port 3000")
})