const db = require("../../data/dbConfig");
module.exports = {
  add,
  find,
  findByName,
  findById,
  findBy,
};

function find() {
  return db("users").select("id", "username");
}

function findByName(username) {
  return db("users").where("username", username);
}

function findBy(username) {
  return db("users").where("username", username).first();
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findById(id) {
  return db("users").where({ id }).first();
}
