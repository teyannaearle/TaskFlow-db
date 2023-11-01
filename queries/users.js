const db = require("../db/dbConfig.js");
const pgp = require("pg-promise")();
let QRE = pgp.errors.QueryResultError;
let qrec = pgp.errors.queryResultErrorCode;

const getUser = async (email) => {
  try {
    const oneUser = await db.one("SELECT * FROM users WHERE email=$1", [email]);
    return oneUser;
  } catch (err) {
    if (err instanceof QRE && err.code === qrec.noData) {
      return null;
    } else {
      console.log("query caught an error");
      console.log(err);
      return err;
    }
  }
};

const createNewUser = async (email) => {
  try {
    const newUser = await db.one(
      "INSERT INTO users (email) VALUES ($1) RETURNING *",
      [email]
    );
    return newUser;
  } catch (err) {
    if (err instanceof QRE && err.code === qrec.noData) {
        return null;
      } else {
        console.log("query caught an error");
        console.log(err);
        return err;
      }
  }
};

module.exports = {
  getUser,
  createNewUser
};