const express = require("express")

const { jobAt2am, jobAt4, jobAt6, jobAt10, jobAt8, jobAt12, jobAt2pm } = require("./src/twitterBotJob.js");

const app = express();

app.get("/", (req, res) => {
	res.send("Check out @Gooner_Bot on Twitter")
        jobAt2am.start()
	jobAt4.start()
	jobAt6.start()
	jobAt8.start()
	jobAt10.start()
	jobAt12.start()
	jobAt2pm.start()
})

app.listen(process.env.PORT || 3000, () => {
	console.log("Server running...")
})
