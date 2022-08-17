const express = require("express")

const { jobAt4, jobAt6, jobAt10, jobAt8, jobAt12 } = require("./src/twitterBotJob.js");
// const { test } = require("./src/test.js");

const app = express();

app.get("/", (req, res) => {
	res.send("Check out @Gooner_Bot on Twitter")
	// test.start()
	jobAt4.start()
	jobAt6.start()
	jobAt8.start()
	jobAt10.start()
	jobAt12.start()
})

app.listen(process.env.PORT || 3000, () => {
	console.log("Server running...")
})