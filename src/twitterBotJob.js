const rwClient = require("./twitterClient.js");
const cron = require("node-cron");
const axios = require("axios");

// RapidAPI headers
const headers = {
	// eslint-disable-next-line no-undef
	"x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
	// eslint-disable-next-line no-undef
	"x-rapidapi-host": process.env.X_RAPIDAPI_HOST
};

const getFixture = async () => {
	try {
		// GET requests to RapidAPI for fixture data
		const fixtures = await axios.get("https://v3.football.api-sports.io/fixtures?season=2022&team=42&next=2", {"headers" : headers});
		
		// days til match
		const countDownDate = new Date(fixtures.data.response[0].fixture.date).getTime();
		const now = new Date().getTime();
		const timeLeft = countDownDate - now;
		const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
		const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

		// if less than 5 days til match
		if (days < 5) {
		
			// get opponent 
			const opponent = (fixtures.data.response[0].teams.home.name.includes("Arsenal") 
				? fixtures.data.response[0].teams.away.name : fixtures.data.response[0].teams.home.name);
		
			// get stadium
			const stadium = fixtures.data.response[0].fixture.venue.name;

			// get fixtureId and GET requests to RapidAPI for prediction data
			const fixtureId = fixtures.data.response[0].fixture.id;
			const predictions = await axios.get(`https://v3.football.api-sports.io/predictions?fixture=${fixtureId}`, {"headers" : headers});

			// get league name
			const leagueName= predictions.data.response[0].league.name;

			// get arsenal form
			const arsenalForm = (predictions.data.response[0].teams.home.name.includes("Arsenal") 
				? predictions.data.response[0].teams.home.league.form : predictions.data.response[0].teams.away.league.form);
			const arsenalFormNull = arsenalForm === null ? "n/a" : arsenalForm;
		
			// information tweet
			const content1Days = 
			`⚽ Arsenal Face ${opponent} in ${days} day(s) ⚽
			🔴 Stadium: ${stadium} 🔴 
			⚪ League: ${leagueName} ⚪
			🔴 Current Form: ${arsenalFormNull} 🔴
			#arsenal #afc #coyg #aresenalPicks #arsenalBets`;
		
			// information tweet
			const content1Hours = 
			`⚽ Arsenal Face ${opponent} in ${hours} hr(s) ⚽
			🔴 Stadium: ${stadium} 🔴 
			⚪ League: ${leagueName} ⚪
			🔴 Current Form: ${arsenalFormNull} 🔴
			#arsenal #afc #coyg #aresenalPicks #arsenalBets`;
	
			// send information tweet if days is > 0
			if (days > 0) {
				rwClient.v2.tweet(content1Days);
			} 

			if (days === 0 ) {
				rwClient.v2.tweet(content1Hours);
			}
		
			// if days til match is 0 and less than or equal to 2 hours til match
			if (days < 1) {
			// get predicted winner
				const winner = predictions.data.response[0].predictions.winner.name === null ? "n/a" 
					: predictions.data.response[0].predictions.winner.name;
		
				// get predicted arsenal goals
				const arsenalGoals = predictions.data.response[0].teams.home.name.toLowerCase() === "arsenal" 
					? predictions.data.response[0].predictions.goals.home 
					: predictions.data.response[0].predictions.goals.away;
				const arsenalGoalsOU = arsenalGoals === null ? "n/a" : arsenalGoals.includes("-") 
					? arsenalGoals.replace("-", "U") : arsenalGoals.replace("+", "O");
		
				// get predicted opponent goals
				const opponentGoals = predictions.data.response[0].teams.home.name === `${opponent}`
					? predictions.data.response[0].predictions.goals.home 
					: predictions.data.response[0].predictions.goals.away; 
				const opponentGoalsOU = opponentGoals === null ? "n/a" : opponentGoals.includes("-")
					? opponentGoals.replace("-", "U") : opponentGoals.replace("+", "O");

				// predictions tweet
				const content2 = 
		`⚽ Predictions against ${opponent} ⚽
		🔴 Winner: ${winner} 🔴
		⚪️ Arsenal Goals: ${arsenalGoalsOU} ⚪️
		🔴 ${opponent} Goals: ${opponentGoalsOU} 🔴
		#arsenal #afc #coyg #aresenalPicks #arsenalBets`;
				
				// send predictions tweet
				rwClient.v2.tweet(content2);
			}
		}
	} catch (error) {
		console.log(error);
	}
};

// 2am MST
const jobAt2am = cron.schedule("0 9 * * *", async () => {
	await getFixture();
	console.log("Successfully sent a tweet at: " + new Date());
});

module.exports = { jobAt2am };
