const serverStore = require("../serverStore");
const roomsUpdates = require("./updates/rooms");

const roomChordHandler = (socket, data, remoteUsers, socketId) => {
  socket.to(socketId).emit("sendChord", data);
  console.log("remoteUsers:", remoteUsers);
  remoteUsers.forEach((remoteUser) => {
    socket.to(remoteUser).emit("sendChord", data);
  });
  socket.emit("sendChord", data);
};

module.exports = roomChordHandler;
