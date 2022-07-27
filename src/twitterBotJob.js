const rwClient = require("./twitterClient.js")
const cron = require("node-cron")
const axios = require('axios')

const headers = {
	"x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
	"x-rapidapi-host": process.env.X_RAPIDAPI_HOST
}

const getFixture = async () => {
	try {
		// GET requests to RapidAPI
		const fixtures = await axios.get("https://v3.football.api-sports.io/fixtures?season=2022&team=42&next=2", {"headers" : headers})
		const fixtureId = fixtures.data.response[0].fixture.id
		const predictions = await axios.get(`https://v3.football.api-sports.io/predictions?fixture=${fixtureId}`, {"headers" : headers})
		
		// days til match
		const countDownDate = new Date(fixtures.data.response[0].fixture.date).getTime()
		const now = new Date().getTime()
		const timeLeft = countDownDate - now
		var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
		var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
		
		
		// content 1 
		const opponent = (fixtures.data.response[0].teams.home.name.includes("Arsenal") 
		? fixtures.data.response[0].teams.away.name : fixtures.data.response[0].teams.home.name)
		const stadium = fixtures.data.response[0].fixture.venue.name
		const city = fixtures.data.response[0].fixture.venue.city
		const leagueName= predictions.data.response[0].league.name
		const arsenalForm = (predictions.data.response[0].teams.home.name.includes("Arsenal") 
		? predictions.data.response[0].teams.home.league.form : predictions.data.response[0].teams.away.league.form)
		
		
		// tweet messages
		const content1 = 
		`⚽ Arsenal face ${opponent} in ${days} day(s) ${hours} hr(s) 
		🔴 Stadium: ${stadium} 
		⚪ Location: ${city} 
		🔴 League: ${leagueName} 
		⚪ Current Form: ${arsenalForm} 
		⚽ #arsenal #afc #coyg #sportsBetting #freePicks #goonerBot`
		
		// send tweets
		rwClient.v2.tweet(content1)

		if (days < 1) {
			const winner = predictions.data.response[0].predictions.winner.name
		// const winOrDraw = predictions.data.response[0].predictions.win_or_draw
		const winOrDraw = predictions.data.response[0].predictions.win_or_draw.toLowerCase() === "true" ? "Yes" : "No"
		const overUnder = predictions.data.response[0].predictions.under_over.includes("-") 
                ? predictions.data.response[0].predictions.under_over.replace("-", "U") 
                : predictions.data.response[0].predictions.under_over.replace("+", "O")
		// const advice = predictions.data.response[0].predictions.advice
		const arsenalGoals = predictions.data.response[0].teams.home.name.toLowerCase() === "Arsenal" 
		? predictions.data.response[0].predictions.goals.home 
		: predictions.data.response[0].predictions.goals.away

		const arsenalGoalsOU = arsenalGoals.includes("-")
		? arsenalGoals.replace("-", "U") 
        : arsenalGoals.replace("+", "O")

		const opponentGoals = predictions.data.response[0].teams.home.name.toLowerCase() === `${opponent}`
		? predictions.data.response[0].predictions.goals.home 
		: predictions.data.response[0].predictions.goals.away 

		const opponentGoalsOU = opponentGoals.includes("-")
		? opponentGoals.replace("-", "U") 
        : opponentGoals.replace("+", "O")

		const content2 = 
		`⚽ PREDICTIONS 
		🔴 Winner: ${winner} 
		⚪ Draw No Bet: ${winOrDraw} 
		🔴 Over Under: ${overUnder}
		⚪ Arsenal Goals: ${arsenalGoalsOU}
		🔴 ${opponent} Goals: ${opponentGoalsOU}
		⚽ #arsenal #afc #coyg #sportsBetting #freePicks #goonerBot`
		
		rwClient.v2.tweet(content2)

		}
		
	} catch (error) {
		console.log(error)
	}
}

	// heroku uses GMT
	// 0 15 * * * = 8am Phoenix MST
	// 0 12 * * * = 5am Phoenix MST and 1pm London
	const job = cron.schedule("0 12 * * *", async () => {
		await getFixture()
		console.log("Successfully sent a tweet at: " + new Date())
})

module.exports = { job }
