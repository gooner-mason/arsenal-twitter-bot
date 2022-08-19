const rwClient = require("./twitterClient.js")
const cron = require("node-cron")
const axios = require('axios')

// RapidAPI headers
const headers = {
	"x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
	"x-rapidapi-host": process.env.X_RAPIDAPI_HOST
}

const getFixture = async () => {
	try {
		// GET requests to RapidAPI for fixture data
		const fixtures = await axios.get("https://v3.football.api-sports.io/fixtures?season=2022&team=42&next=2", {"headers" : headers})
		
		// days til match
		const countDownDate = new Date(fixtures.data.response[0].fixture.date).getTime()
		const now = new Date().getTime()
		const timeLeft = countDownDate - now
		const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
		const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
		const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))

		// if less than 5 days til match
		if (days < 5) {
		
		// get opponent 
		const opponent = (fixtures.data.response[0].teams.home.name.includes("Arsenal") 
		? fixtures.data.response[0].teams.away.name : fixtures.data.response[0].teams.home.name)
		
		// get stadium
		const stadium = fixtures.data.response[0].fixture.venue.name

		// get fixtureId and GET requests to RapidAPI for prediction data
		const fixtureId = fixtures.data.response[0].fixture.id
		const predictions = await axios.get(`https://v3.football.api-sports.io/predictions?fixture=${fixtureId}`, {"headers" : headers})

		// get league name
		const leagueName= predictions.data.response[0].league.name

		// get arsenal form
		const arsenalForm = (predictions.data.response[0].teams.home.name.includes("Arsenal") 
		? predictions.data.response[0].teams.home.league.form : predictions.data.response[0].teams.away.league.form)
		const arsenalFormNull = arsenalForm === null ? "n/a" : arsenalForm
		
		// information tweet
		const content1 = 
		`⚽ INFORMATION ⚽
		🔴 Opponent: ${opponent} 🔴
		⚪ Kickoff: ${days} day(s) ${hours} hr(s) ${minutes} min(s) ⚪
		🔴 Stadium: ${stadium} 🔴 
		🔴 League: ${leagueName} 🔴 
		⚪ Current Form: ${arsenalFormNull} ⚪ 
		#arsenal #afc #coyg #aresenalPicks #arsenalBets #freePicks`
	
		// send information tweet 
		rwClient.v2.tweet(content1)
		
		// if days til match is 0 and less than or equal to 2 hours til match
		if (days === 0 && hours <=2 ) {

		// get predicted winner
		const winner = predictions.data.response[0].predictions.winner.name === null ? "n/a" 
		: predictions.data.response[0].predictions.winner.name

		// get if match will can be a draw
		const winOrDraw = predictions.data.response[0].predictions.win_or_draw === true ? "Yes" : "No"
		
		// get predicted arsenal goals
		const arsenalGoals = predictions.data.response[0].teams.home.name.toLowerCase() === "arsenal" 
		? predictions.data.response[0].predictions.goals.home 
		: predictions.data.response[0].predictions.goals.away
		const arsenalGoalsOU = arsenalGoals === null ? "n/a" : arsenalGoals.includes("-") 
		? arsenalGoals.replace("-", "U") : arsenalGoals.replace("+", "O")
		
		// get predicted opponent goals
		const opponentGoals = predictions.data.response[0].teams.home.name === `${opponent}`
		? predictions.data.response[0].predictions.goals.home 
		: predictions.data.response[0].predictions.goals.away 
		const opponentGoalsOU = opponentGoals === null ? "n/a" : opponentGoals.includes("-")
		? opponentGoals.replace("-", "U") : opponentGoals.replace("+", "O")

		// predictions tweet
		const content2 = 
		`⚽ PREDICTIONS ⚽
		🔴 Winner: ${winner} 🔴
		⚪ Draw No Bet: ${winOrDraw} ⚪
		⚪ Arsenal Goals: ${arsenalGoalsOU} ⚪
		🔴 ${opponent} Goals: ${opponentGoalsOU} 🔴
		#arsenal #afc #coyg #aresenalPicks #arsenalBets #freePicks`
		
		// send predictions tweet
		rwClient.v2.tweet(content2)
	}
}
	} catch (error) {
		console.log(error)
	}
}

	// 4am MST
	const jobAt4 = cron.schedule("0 11 * * *", async () => {
		await getFixture()
		console.log("Successfully sent a tweet at: " + new Date())
})

	// 6am MST
	const jobAt6 = cron.schedule("0 13 * * *", async () => {
		await getFixture()
		console.log("Successfully sent a tweet at: " + new Date())
})

	// 8am MST
	const jobAt8 = cron.schedule("0 15 * * *", async () => {
		await getFixture()
		console.log("Successfully sent a tweet at: " + new Date())
})

	// 10am MST
	const jobAt10 = cron.schedule("0 17 * * *", async () => {
		await getFixture()
		console.log("Successfully sent a tweet at: " + new Date())
})

	// 12pm MST
	const jobAt12 = cron.schedule("0 19 * * *", async () => {
		await getFixture()
		console.log("Successfully sent a tweet at: " + new Date())
}) 	
	// 2pm MST
	const jobAt2 = cron.schedule("0 21 * * *", async () => {
		await getFixture()
		console.log("Successfully sent a tweet at: " + new Date())
}) 	

module.exports = { jobAt4, jobAt6, jobAt8, jobAt10, jobAt12, jobAt2 }
