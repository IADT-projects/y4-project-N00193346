const FriendInvitation = require("../../models/friendInvitation");
const friendsUpdates = require("../../socketHandlers/updates/friends");

const postReject = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.user;

    // Find the invitation
    const invitationExists = await FriendInvitation.exists({ _id: id });

    //Remove the initation
    if (invitationExists) {
      await FriendInvitation.findByIdAndDelete(id);
    }

    //Update list of friends pending invitations
    friendsUpdates.updateFriendsPendingInvitations(userId);

    return res.status(200).send("Invitation succesfully rejected");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong please try again");
  }
};

module.exports = postReject;
