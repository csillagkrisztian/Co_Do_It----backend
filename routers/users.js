const express = require("express");
const router = express.Router();
const User = require("../models").user;
const authMiddleware = require("../auth/middleware");
const { validation } = require("../middleware/validation");

router.get(
  "/:id",

  validation(User, "id", "user"),
  authMiddleware,
  async (req, res, next) => {
    const user = req.user;
    delete user.dataValues.password;
    delete user.dataValues.email;
    res.status(200).send(user);
  }
);

router.patch(
  "/:id",
  validation(User, "id", "user"),
  authMiddleware,
  async (req, res, next) => {
    const userThatRequested = req.neededData;
    const user = req.user;
    console.log(user.id !== userThatRequested);

    const body = req.body;
    console.log("userThatRequested", userThatRequested);
    console.log("user", user);
    console.log("body", body);

    const updatedUser = await user.update(req.body);
    delete updatedUser.dataValues.password;
    delete updatedUser.dataValues.email;
    res.send(updatedUser);
  }
);

module.exports = router;
