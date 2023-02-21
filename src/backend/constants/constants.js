const { config } = require("dotenv");

config();

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
	PUBLIC_KEY,
	PRIVATE_KEY,
};
