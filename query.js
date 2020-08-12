const User = require("./models").user;
const Exercise = require("./models").exercise;

const getUsers = async () => {
  const users = await User.findAll({ include: [Exercise] });
  console.log(users.map((u) => u.get({ plain: true })));
};

getUsers();
