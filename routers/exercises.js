const { Router } = require("express");
const Exercise = require("../models").exercise;
const TestCase = require("../models").testCase;

const router = new Router();

router.get("/random", async (req, res, next) => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const allExerciseIds = await Exercise.findAll({ attributes: ["id"] });
  const availableExercises = allExerciseIds.map((e) => e.dataValues.id);
  const randomIndex = getRandomInt(availableExercises.length);
  const neededExercise = availableExercises[randomIndex];

  const randomExercise = await Exercise.findOne({
    where: { id: neededExercise },
    include: [TestCase],
  });

  res.send(randomExercise);
});

module.exports = router;
