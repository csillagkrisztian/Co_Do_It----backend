const users = [];
let rooms = [];
let finishedUsers = [];

const getAllData = () => {
  console.log("users", users);
  console.log("rooms", rooms);
  console.log("finishedUsers", finishedUsers);
};

const addFinishedUser = (id, name, room, code) => {
  room = room.trim().toLowerCase();

  const existingUser = finishedUsers.find(
    (user) => user.room === room && user.id === id
  );

  if (existingUser) {
    return { error: "You already submitted your code!" };
  }

  const user = { id, name, room, code };
  finishedUsers.push(user);

  return { user };
};

const getAllFinished = (room) => {
  return finishedUsers.filter(
    (user) => user.room === room.trim().toLowerCase()
  );
};

const removeAllFinished = (room) => {
  finishedUsers = finishedUsers.filter(
    (user) => user.room !== room.trim().toLowerCase()
  );
  return [];
};

const createRoom = (id, exercise, room) => {
  const duplicate = rooms.find(
    (roomObject) => roomObject.room === room.toLowerCase().trim()
  );
  console.log(duplicate);
  if (duplicate) {
    console.log("that one already exists!");
  } else {
    const currentRoom = { id, exercise, room: room.trim().toLowerCase() };
    rooms.push(currentRoom);
    return room;
  }
};

const getRoom = (roomName) =>
  rooms.find((room) => {
    return room.room === roomName.trim().toLowerCase();
  });

const removeRoom = (roomName) => {
  const remainingRooms = rooms.filter((room) => {
    console.log("What I have", roomName, "What I need", room.room);
    return room.room !== roomName.trim().toLowerCase();
  });
  rooms = remainingRooms;
  return [];
};

const addUser = ({ imageUrl, id, name, room }) => {
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.id === id
  );

  if (existingUser) {
    return { error: "this user already is in the Classroom" };
  }

  const user = { imageUrl, id, name, room };
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
  addFinishedUser,
  getAllFinished,
  removeAllFinished,
  getAllData,
};
