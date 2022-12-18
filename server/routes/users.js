import express from "express";
import {
  getAllUser,
  getUser,
  patchUser,
  deleteUser,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", getAllUser);
router.get("/:username", getUser);
// router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:username", patchUser);

/* DELETE */
router.delete("/:username", deleteUser);

export default router;
