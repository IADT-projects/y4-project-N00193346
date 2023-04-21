const User = require("../../models/user");
const FriendInvitation = require("../../models/friendInvitation");
const friendsUpdates = require("../../socketHandlers/updates/friends");

const postInvite = async (req, res) => {
  const { targetEmailAddress } = req.body;

  const { userId, email } = req.user;

  // check if friend that we would like to invite is not user

  if (email.toLowerCase() === targetEmailAddress.toLowerCase()) {
    return res
      .status(409)
      .send("Sorry. You cannot become friends with yourself");
  }

  const targetUser = await User.findOne({
    email: targetEmailAddress.toLowerCase(),
  });

  if (!targetUser) {
    return res
      .status(404)
      .send(
        `${targetEmailAddress} has not been found. Please check email address.`
      );
  }

  // check if invitation has already been sent
  const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  });

  if (invitationAlreadyReceived) {
    return res.status(409).send("Invitation has been already sent");
  }

  // check if the user which we would like to invite is already our friend
  const usersAlreadyFriends = targetUser.friends.find(
    (friendId) => friendId.toString() === userId.toString()
  );

  if (usersAlreadyFriends) {
    return res
      .status(409)
      .send("Friend already added. Please check friends list");
  }

  // create new invitation in database
  const newInvitation = await FriendInvitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });

  // send pending invitations update to specific user
  friendsUpdates.updateFriendsPendingInvitations(targetUser._id.toString());

  return res.status(201).send("Invitation has been sent");
};

module.exports = postInvite;
