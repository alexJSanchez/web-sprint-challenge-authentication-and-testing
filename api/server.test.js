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
    const expectedStatus = 200;
    const response = await request(server).get("/");
    expect(response.status).toEqual(expectedStatus);
  });
  test("status must be 404", async () => {
    const expectedStatus = { api: "running" };
    const response = await request(server).get("/");
    expect(response.body).toEqual(expectedStatus);
  });
});

describe("[POST] server", () => {
  test("check server", async () => {
    const expectedStatus = 200;
    const response = await request(server).post("/auth/api/register");
    expect(response.status).not.toEqual(expectedStatus);
  });
  test("status must be 404", async () => {
    const expectedStatus = 404;
    const response = await request(server).post("/auth/api/register");
    expect(response.status).toEqual(expectedStatus);
  });
});

describe("[POST] login", () => {
  test("check login", async () => {
    const expectedStatus = 404;
    const response = await request(server).post("/auth/api/login");
    expect(response.status).toEqual(expectedStatus);
  });
  test("login status", async () => {
    const expectedStatus = 200;
    const response = await request(server).post("/auth/api/login");
    expect(response.status).not.toEqual(expectedStatus);
  });
});
