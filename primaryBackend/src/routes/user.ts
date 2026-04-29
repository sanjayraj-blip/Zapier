import { Router } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config.js";
import { prismaClient } from "../db/index.js";
import { authMiddleware } from "../middleware.js";
import { SigninSchema, SignupSchema } from "../types/index.js";

const router = Router();

router.post("/signup", async (req, res) => {
  const body = req.body;
  const parsedData = SignupSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({
      message: "Incorrect Inputs",
    });
  }

  const userExist = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
    },
  });

  if (userExist) {
    return res.status(403).json({
      message: "user already Exists",
    });
  }

  await prismaClient.user.create({
    data: {
      email: parsedData.data.username,
      //we need to hash the password
      password: parsedData.data.password,
      name: parsedData.data.name,
    },
  });

  //await sendEmail()

  return res.json({
    message: "Please verify your Account",
  });
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const parsedData = SigninSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({
      message: "Incorrect Inputs",
    });
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
      password: parsedData.data.password,
    },
  });

  if (!user) {
    return res.status(403).json({
      message: "Sorry credentials are incorrect",
    });
  }

  //sign the jwt
  const token = jwt.sign(
    {
      id: user.id,
    },
    JWT_PASSWORD,
  );

  res.json({
    token: token,
  });
});

router.get("/", authMiddleware, async (req, res) => {
  //TODO fix the type
  //@ts-ignore
  const id = req.id;
  const user = await prismaClient.user.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
    },
  });

  return res.json({
    user,
  });
});

export const userRoutes = router;
