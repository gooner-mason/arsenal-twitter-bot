const { TwitterApi } = require("twitter-api-v2");
require("dotenv").config();

const client = new TwitterApi({
	// eslint-disable-next-line no-undef
	appKey: process.env.APP_KEY ,
	// eslint-disable-next-line no-undef
	appSecret: process.env.APP_SECRET,
	// eslint-disable-next-line no-undef
	accessToken: process.env.ACCESS_TOKEN,
	// eslint-disable-next-line no-undef
	accessSecret: process.env.ACCESS_SECRET
});

const rwClient = client.readWrite;

module.exports = rwClient;