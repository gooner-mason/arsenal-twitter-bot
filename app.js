const express = require("express")
const path = require('path');

const { job1, job2, job3, job4, job5, job6, job7, job8, job9, job10, job11, job12, 
	job13, job14, job15, job16, job17, job18 } = require("./src/twitterBotJob.js");

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
	job10.start()
	job11.start()
	job12.start()
	job13.start()
	job14.start()
	job15.start()
	job16.start()
	job17.start()
	job18.start()
})

app.listen(process.env.PORT || 3000, () => {
	console.log("Server running on port 3000")
})