// Write your tests here
const authModel = require("./auth/auth-model");
const db = require("../data/dbConfig");
const server = require("./server");
const request = require("supertest");
const jokes = require("./jokes/jokes-data");
console.log(jokes);

//before all we want to reset our data so where back start with a pure database

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

test("sanity", () => {
  expect(true).toBe(true);
});
//first endpont
describe("[GET] server", () => {
  test("check server", async () => {
    const expectedCode = 200;
    const response = await request(server).get("/");
    expect(response.status).toEqual(expectedCode);
  });
  test("makes sure api is running", async () => {
    const expectedResponse = "running";
    const response = await request(server).get("/");
    expect(response.body.api).toBe(expectedResponse);
  });
});
//second end point
describe("[Get] /jokes", () => {
  test("responds with 200 Ok", async () => {
    const res = await request(server).get("/api/jokes/");
    expect(res.status).toBe(200);
  });
  test("invalid token response", async () => {
    const res = await request(server).get("/api/jokes/");
    expect(res.body).toMatchObject({
      message: "token required",
      status: 401,
    });
  });
});

// describe("test3", () => {
//   it("check if username is added", async () => {
//     await authModel.add({ username: "player1", password: "hello" });
//     const user = await db("users");
//     expect(user).toHaveLength(1);
//   });
// });
