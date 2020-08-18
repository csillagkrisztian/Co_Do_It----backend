const express = require("express");
const loggerMiddleWare = require("morgan");
const corsMiddleWare = require("cors");
const { PORT } = require("./config/constants");
const authRouter = require("./routers/auth");
const exerciseRouter = require("./routers/exercises");
const socketIoRouter = require("./routers/socketIo");
const authMiddleWare = require("./auth/middleware");
const http = require("http");
const socketIo = require("socket.io");

const {
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
} = require("./users");

const app = express();

const server = http.createServer(app);

const io = socketIo(server);

/**
 * Middlewares
 *
 * It is advisable to configure your middleware before configuring the routes
 * If you configure routes before the middleware, these routes will not use them
 *
 */

/**
 * a necessary router for Socket.io to
 */

app.use(socketIoRouter);
/**
 * morgan:
 *
 * simple logging middleware so you can see
 * what happened to your request
 *
 * example:
 *
 * METHOD   PATH        STATUS  RESPONSE_TIME   - Content-Length
 *
 * GET      /           200     1.807 ms        - 15
 * POST     /echo       200     10.251 ms       - 26
 * POST     /puppies    404     1.027 ms        - 147
 *
 * github: https://github.com/expressjs/morgan
 *
 */

app.use(loggerMiddleWare("dev"));

/**
 *
 * express.json():
 * be able to read request bodies of JSON requests
 * a.k.a. body-parser
 * Needed to be able to POST / PUT / PATCH
 *
 * docs: https://expressjs.com/en/api.html#express.json
 *
 */

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

/**
 *
 * cors middleware:
 *
 * Since our api is hosted on a different domain than our client
 * we are are doing "Cross Origin Resource Sharing" (cors)
 * Cross origin resource sharing is disabled by express by default
 * for safety reasons (should everybody be able to use your api, I don't think so!)
 *
 * We are configuring cors to accept all incoming requests
 * If you want to limit this, you can look into "white listing" only certain domains
 *
 * docs: https://expressjs.com/en/resources/middleware/cors.html
 *
 */

app.use(corsMiddleWare());

/**
 *
 * delay middleware
 *
 * Since our api and client run on the same machine in development mode
 * the request come in within milliseconds
 * To simulate normal network traffic this simple middleware delays
 * the incoming requests by 1500 second
 * This allows you to practice with showing loading spinners in the client
 *
 * - it's only used when you use npm run dev to start your app
 * - the delay time can be configured in the package.json
 */

if (process.env.DELAY) {
  app.use((req, res, next) => {
    setTimeout(() => next(), parseInt(process.env.DELAY));
  });
}

/**
 *
 * authMiddleware:
 *
 * When a token is provided:
 * decrypts a jsonwebtoken to find a userId
 * queries the database to find the user with that add id
 * adds it to the request object
 * user can be accessed as req.user when handling a request
 * req.user is a sequelize User model instance
 *
 * When no or an invalid token is provided:
 * returns a 4xx reponse with an error message
 *
 * check: auth/middleware.js
 *
 * For fine grained control, import this middleware in your routers
 * and use it for specific routes
 *
 * for a demo check the following endpoints
 *
 * POST /authorized_post_request
 * GET /me
 *
 */

/**
 * Socket.io
 *
 * Now we will get our hands dirty with some real time web sockets
 */

io.on("connection", (socket) => {
  socket.on("joined", (userObject, callback) => {
    const { id, name, room } = userObject;
    addUser({ id, name, room });
    socket.join(room);
    const roomMembers = getAll(room);
    io.to(room).emit("refresh", roomMembers);
  });

  socket.on("add exercise", ({ id, exercise, room }) => {
    createRoom(id, exercise, room);
    console.log({ id, exercise, room });
    io.to(room).emit("exercise", exercise);
  });

  socket.on("success", (userObject, code) => {
    const { id, name, room } = userObject;
    addFinishedUser(id, name, room, code);
    const finishedUsers = getAllFinished(room);
    io.to(room).emit("star refresh", finishedUsers);
  });

  socket.on("clear all finished", (room) => {
    const freshFinished = removeAllFinished(room);
    removeRoom(room);
    io.to(room).emit("new exercise");
    io.to(room).emit("star refresh", freshFinished);
  });

  socket.on("unjoined", (userObject, callback) => {
    const { id, room } = userObject;
    const user = getUser(id);
    if (!user) {
      return;
    }
    removeUser(user.id);
    const roomMembers = getAll(room);
    if (!roomMembers) {
      removeRoom(room);
    }
    io.to(room).emit("refresh", roomMembers);
  });

  socket.on("delete previous room", (room) => {
    const neededRoom = getRoom(room);
    if (!neededRoom) {
      console.log(`${room} not found`);
    } else {
      removeRoom(room);
    }
  });

  socket.on("i want exercise", (room) => {
    const neededRoom = getRoom(room);
    if (!neededRoom) {
      console.log("class hasn't started yet!");
    } else {
      socket.to(room).emit("exercise", neededRoom.exercise);
    }
  });

  socket.on("disconnect", (userObject, callback) => {
    const { id, room } = userObject;
    const user = getUser(id);
    if (!user) {
      return;
    }
    removeUser(user.id);
    if (!roomMembers) {
      removeRoom(room);
    }
    const roomMembers = getAll(room);
    io.to(room).emit("refresh", roomMembers);
  });
});

app.use("/", authRouter);
app.use("/exercises", exerciseRouter);

// Listen for connections on specified port (default is port 4000)

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
