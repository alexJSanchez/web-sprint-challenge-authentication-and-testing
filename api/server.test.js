// Write your tests here
const authModel = require("./auth/auth-model");
const db = require("../data/dbConfig");
const server = require("./server");
const request = require("supertest");

//before all we want to reset our data so where back start with a pure database

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

test("sanity", () => {
  expect(true).toBe(true);
});

describe("test2", () => {
  test("check auth model", async () => {
    const expectedCode = 200;
    const response = await request(server).get("/");
    expect(response.status).toEqual(expectedCode);
  });
});

describe("[Get] /jokes", () => {
  test("responds with 200 Ok", async () => {
    const res = await request(server).get("/api/jokes");
    expect(res.status).toBe(200);
  });
});

// describe("test3", () => {
//   it("check if username is added", async () => {
//     await authModel.add({ username: "player1", password: "hello" });
//     const user = await db("users");
//     expect(user).toHaveLength(1);
//   });
// });
