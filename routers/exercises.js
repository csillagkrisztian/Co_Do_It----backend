const { Router, response } = require("express");
const Exercise = require("../models").exercise;
const TestCase = require("../models").testCase;
const authMiddleware = require("../auth/middleware");

const router = new Router();

router.get("/random", async (req, res, next) => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const allExerciseIds = await Exercise.findAll({
    where: { isPublic: true },
    attributes: ["id"],
  });

  const availableExercises = allExerciseIds.map((e) => e.dataValues.id);
  const randomIndex = getRandomInt(availableExercises.length);
  const neededExercise = availableExercises[randomIndex];

  const randomExercise = await Exercise.findOne({
    where: { id: neededExercise },
    include: [TestCase],
  });

  res.status(200).send(randomExercise);
});

router.post("/create", authMiddleware, async (req, res, next) => {
  try {
    const { description, explanation, isPublic, testCases } = req.body;
    if (!description || !explanation || !isPublic || !testCases) {
      res.status(400).send({ message: "Missing credentials!" });
    }
    const newExercise = await Exercise.create({
      description,
      explanation,
      isPublic,
      userId: req.user.id,
    });
    const parsedTestCases = JSON.parse(testCases);
    const newTestCases = parsedTestCases.map(
      async (tc) => await TestCase.create({ ...tc, exerciseId: newExercise.id })
    );
    await Promise.all(newTestCases);
    res.send({ newExercise, newTestCases });
  } catch (error) {
    res.send({ message: "something went wrong", error: error });
  }
});

module.exports = router;
