import User from "../models/User.js";
import bcrypt from "bcrypt";

/* READ */
export const getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const patchUser = async (req, res) => {
  try {
    const { username } = req.params;
    console.log('patch user req.body>>>>', req.body)
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(req.body['password'], salt);
    const updatedUser = await User.updateOne(
      { username },
      { $set: {
        username: req.body['username'],
        password: passwordHash,
      }},
    )

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* DELETE */
export const deleteUser = async (req, res) => {
  try {
    const { username } = req.params;
    const removedUser = await User.deleteOne({ username })
    if(!removedUser.deletedCount) {
      throw new Error('No matched user found')
    }
    res.status(204)
    .send()
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
