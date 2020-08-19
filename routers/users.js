const express = require("express");
const router = express.Router();
const User = require("../models").user;
const authMiddleware = require("../auth/middleware");
const { validation } = require("../middleware/validation");

router.get(
  "/:id",
  validation(User, "id", "validationUser"),
  authMiddleware,
  async (req, res, next) => {
    const user = req.validationUser;
    delete user.dataValues.password;
    delete user.dataValues.email;
    res.status(200).send(user);
  }
);

router.patch(
  "/:id",
  validation(User, "id", "validationUser"),
  authMiddleware,
  async (req, res, next) => {
    const userThatRequested = req.neededData;
    const user = req.validationUser;
    if (userThatRequested.userId === user.id) {
      try {
        const updatedUser = await user.update(req.body);
        delete updatedUser.dataValues.password;
        delete updatedUser.dataValues.email;
        res.send(updatedUser);
      } catch (error) {
        res
          .send(400)
          .status({ message: "Something went wrong with the updating" });
      }
    } else {
      res
        .status(401)
        .send({ message: "You are not authorized to update the user!" });
    }
  }
);

module.exports = router;
