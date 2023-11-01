const express = require("express");
const users = express.Router({ mergeParams: true });

const { getUser, createNewUser } = require("../queries/users.js");

users.get("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const user = await getUser(email);
    console.log(user);
    if (user.email) {
      res.status(200).json({
        success: true,
        payload: user,
      });
    } else {
      res.status(202).json({
        success: false,
        payload: `No registered user found with email ${email}`,
      });
    }
  } catch (e) {
    res.status(404).json({
      success: false,
      payload: e,
    });
  }
});


users.post("/", async (req, res) => {
  const { email } = req.body;
  try {
    const newUser = await createNewUser(email);
    if (newUser.user_id) {
      console.log("success creating new user");
      res.status(200).json({
        success: true,
        payload: newUser,
      });
    } else {
      throw `No user was created with email ${email}`;
    }
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e,
    });
  }
});

module.exports = users;