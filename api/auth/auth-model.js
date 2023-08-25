const db = require("../../data/dbConfig");
module.exports = {
  add,
  find,
  findByName,
  findById,
};

function find() {
  return db("users").select("id", "username");
}

function findByName(username) {
  return db("users").where("username", username);
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findById(id) {
  return db("users").where({ id }).first();
}
