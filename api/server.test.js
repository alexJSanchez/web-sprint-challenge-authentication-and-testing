// Write your tests here
const authModel = require("./auth/auth-model");
const db = require("../data/dbConfig");
const server = require("./server");
const request = require("supertest");

test("sanity", () => {
  expect(true).toBe(true);
});

describe("test2", () => {
  test("check auth model", async () => {
    const response = await request(server).post("auth/register");
    expect(response.status).toBe(201);
  });
});
