const serverStore = require("../serverStore");
const roomsUpdates = require("./updates/rooms");

const roomJoinHandler = (socket, data) => {
  //Get room Id from socket data
  const { roomId } = data;

  //Get user details from socket
  const participantDetails = {
    userId: socket.user.userId,
    socketId: socket.id,
  };

  //Get room details from server store
  const roomDetails = serverStore.getActiveRoom(roomId);
  serverStore.joinActiveRoom(roomId, participantDetails);

  //Send information to users in room that they should prepare for incoming connection
  roomDetails.participants.forEach((participant) => {
    if (participant.socketId !== participantDetails.socketId) {
      socket.to(participant.socketId).emit("conn-prepare", {
        connUserSocketId: participantDetails.socketId,
      });
    }
  });

  roomsUpdates.updateRooms();
};

module.exports = roomJoinHandler;
