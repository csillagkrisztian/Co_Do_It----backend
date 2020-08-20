const express = require("express");
const router = express.Router();
const User = require("../models").user;
const authMiddleware = require("../auth/middleware");

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const teachers = await User.findAll({ where: { accountType: "teacher" } });
    const teacherNames = teachers.map((t) => t.dataValues.name);
    res.status(200).send(teacherNames);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
