import { Request, Response } from "express";
import * as userService from "../services/user_service";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  const userToBeCreated = req.body;
  try {
    const user = await userService.createUser(userToBeCreated);
    res.status(201).json(user);
  } catch (error) {
    let message = (error as Error).message;
    res.status(400).json({ message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const password = req.query.password;
  const email = req.query.email;
  console.log("params = " + email + ", " + password);
  console.dir(req.query);
  try {
    const foundUser = await userService.getUser(email as string);
    console.log ("foundUser.password = " + foundUser?.password);
    if (foundUser !== null) {
      bcrypt.compare(password as string, foundUser.password, (err, result) => {
        if (result === true) {
          console.log("user ok");
          res.json(foundUser).status(200);
        } else {
          res.status(401).json({message: "Unauthorised user"});
        }
      });
    } else {
      res.status(400).json({message: "User not found"});
    }
  } catch (error) {
    res.status(401).json({message: "Unauthorised user"});
  }
};