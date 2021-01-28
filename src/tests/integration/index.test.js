const expect = require("expect");
const request = require("supertest");
const { app } = require("./../../app");

describe("ROUTES", () => {
    describe("APP HEALTH - /health", () => {
        it("should return a 200 status code if the app is up", (done) => {
            request(app)
                .get("/health")
                .expect(200)
                .end(done);
        });
    });

    describe("BASE ROUTE - /", () => {
        it("should return the data about the owner of the application", (done) => {
            request(app)
                .get("/")
                .expect(200)
                .expect((res) => {
                    expect(res.body).toHaveProperty("message");
                    expect(res.body).toHaveProperty("status");
                    expect(res.body).toHaveProperty("data");
                    expect(res.body.data).toHaveProperty("name");
                    expect(res.body.data).toHaveProperty("github");
                    expect(res.body.data).toHaveProperty("email");
                    expect(res.body.data).toHaveProperty("mobile");
                    expect(res.body.data).toHaveProperty("twitter");
				})
                .end(done);
        });
    });

});