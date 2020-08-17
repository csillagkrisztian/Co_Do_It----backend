const users = [];
const rooms = [];

const createRoom = (id, exercise, room) => {
  const currentRoom = { id, exercise, room: room.trim().toLowerCase() };
  rooms.push(currentRoom);
  return room;
};

const getRoom = (roomName) =>
  rooms.find((room) => {
    return room.room === roomName.trim().toLowerCase();
  });

const removeRoom = (roomName) => {
  const room = rooms.find((room) => {
    return room.room === roomName.trim().toLowerCase();
  });
  const index = rooms.indexOf(room);
  if (index !== -1) {
    return rooms.splice(index, 1)[0];
  }
};

const addUser = ({ id, name, room }) => {
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

module.exports = {
  addUser,
  removeUser,
  getUser,
  getAll,
  createRoom,
  getRoom,
  removeRoom,
};
