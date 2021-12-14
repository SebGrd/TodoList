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
  const users = await User.findById(req.body.id);
  res.json(users);
});

/* POST user. */
router.get("/:id", async (req: Request, res: Response) => {
  const users = await User.findById(req.body.id);
  res.json(users);
});

export default router;
