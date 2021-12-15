import express, { Request, Response } from "express";
const router = express.Router();

import User from "../models/user";

/* GET users listing. */
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

/* GET user. */
router.get("/:id", async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

/* POST user. */
router.post("/", async (req: Request, res: Response) => {
  const user = new User(req.body)
  const error = user.validateSync();
  if (error) {
    res.status(400);
    res.json(error.message);
  } else {
    user.save();
    res.json(user);
  }
});

/* DELETE user. */
router.delete("/:id", async (req: Request, res: Response) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.json(user);
});

export default router;
