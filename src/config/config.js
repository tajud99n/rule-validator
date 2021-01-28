const appName = "rule-validator-api";

const config = {
	appName: appName,
    port: process.env.PORT,
    owner: {
        name: process.env.OWNER_NAME
    }
};

module.exports = { config };