const rwClient = require("./twitterClient.js")
const cron = require("node-cron")

const getFixture = async () => {
const opponent = "test"
const stadium = "test"
const city = "test"
const leagueName = "test"
const arsenalFormNull = "test"

const countDownDate = new Date("2022-08-20T16:30:00.000Z").getTime()
const now = new Date().getTime()
const timeLeft = countDownDate - now
const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))


const content1 = 
		`⚽ INFORMATION ⚽
		🔴 Arsenal face ${opponent} 🔴
		⚪ Kickoff In ${days} day(s) ${hours} hr(s) ${minutes} min(s) ⚪
		🔴 Stadium: ${stadium} 🔴 
		⚪ Location: ${city} ⚪ 
		🔴 League: ${leagueName} 🔴 
		⚪ Current Form: ${arsenalFormNull} ⚪ 
		#arsenal #afc #coyg #aresenalPicks #arsenalBets #sportsBetting #freePicks #goonerBot`

rwClient.v2.tweet(content1)

}
		const test = cron.schedule("*/10 * * * * *", async () => {
			await getFixture()
			console.log("Successfully sent a tweet at: " + new Date())
	})

module.exports = { test }