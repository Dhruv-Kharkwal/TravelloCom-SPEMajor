import User from "../models/User.js";
import { logger } from "../config/logger.js";
/*READ*/
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    logger.info(`Successfully got user's data!`);
    res.status(200).json(user);
  } catch (err) {
    logger.error(`Error while getting user data: ${err.message}`);
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    logger.info(`Successfully got user's friend's list!`);
    res.status(200).json(formattedFriends);
  } catch (err) {
    logger.error(`Error while getting user's friends data: ${err.message}`);
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    logger.info(`Successfully added/removed user's friend!`);
    res.status(200).json(formattedFriends);
  } catch (err) {
    logger.error(`Error while adding/removing user's friend: ${err.message}`);
    res.status(404).json({ message: err.message });
  }
};
