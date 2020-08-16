const users = [];

const addUser = ({ id, name, room }) => {
  if (!name) {
    name = "guest";
  }
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.id === id
  );

  if (existingUser) {
    return { error: "this user already is in the Classroom" };
  }

  const user = { id, name, room };
  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getAll = (room) => {
  return users.filter((user) => user.room === room.trim().toLowerCase());
};

module.exports = { addUser, removeUser, getUser, getAll };
