const { Router } = require("express");
const { http_responder } = require("../utils/http_response");

// Init router and path
const router = Router();

router.get("/health", (req, res) => {
	const message = "rule validator Server is up & Running";
	return http_responder.sendResponse(res, null, message, "success", 200);
});


// Export the base-router
module.exports = router;