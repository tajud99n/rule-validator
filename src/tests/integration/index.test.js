const expect = require("expect");
const request = require("supertest");
const { app } = require("./../../app");

describe("APP HEALTH", () => {

    it("should return a 200 status code if the app is up", (done) => {
        request(app)
            .get("/health")
            .expect(200)
            .end(done);
    });

});