const express = require("express")

const { jobAt4, jobAt6, jobAt10, jobAt8, jobAt12, jobAt2 } = require("./src/twitterBotJob.js");

const app = express();

app.get("/", (req, res) => {
	res.send("Check out @Gooner_Bot on Twitter")
	jobAt4.start()
	jobAt6.start()
	jobAt8.start()
	jobAt10.start()
	jobAt12.start()
	jobAt2.start()
})

app.listen(process.env.PORT || 3000, () => {
	console.log("Server running...")
})