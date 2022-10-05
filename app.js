const express = require("express")

const { jobAt2am } = require("./src/twitterBotJob.js");

const app = express();

app.get("/", (req, res) => {
	res.send("Check out @Gooner_Bot on Twitter")
	jobAt2am.start()
})

app.listen(process.env.PORT || 3000, () => {
	console.log("Server running...")
})
