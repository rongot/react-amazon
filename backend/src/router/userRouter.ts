import express, { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { User, UserModel } from "../models/userNodel"
import bcrypt from "bcryptjs"
import { generateToken } from "../utills"

export const userRouter = express.Router()
// POST /api/users/signin
userRouter.post(
  "/signIn",
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ email: req.body.email })
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        })
        return
      }
    }
    res.status(401).json({ message: "Invalid email or password" })
  })
)

userRouter.post(
  "/signUp",
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.name),
      //as User conver user to User object
    } as User)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    })
  })
)
