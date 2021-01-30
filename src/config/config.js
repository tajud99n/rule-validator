const appName = "rule-validator-api";

const config = {
	appName: appName,
    port: process.env.PORT,
    owner: {
        name: process.env.OWNER_NAME,
        github: process.env.GITHUB,
        email: process.env.EMAIL,
        mobile: process.env.MOBILE,
        twitter: process.env.TWITTER,
    }
};

module.exports = { config };