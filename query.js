const User = require("./models").user;
const Exercise = require("./models").exercise;
const TestCase = require("./models").testCase;

const getUsers = async () => {
  const users = await Exercise.findAll({ include: [TestCase] });
  console.log(users.map((u) => u.get({ plain: true })));
};

getUsers();
