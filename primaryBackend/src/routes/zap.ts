import { Router } from "express";
import { prismaClient } from "../db/index.js";
import { authMiddleware } from "../middleware.js";
import { zapCreateSchema } from "../types/index.js";

const router = Router();

router.post("/", authMiddleware, async (req, res) => {
  const body = req.body();
  const parsedData = zapCreateSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({
      message: "Incorrect Zap details",
    });
  }

  await prismaClient.$transaction(async (tx:any) => {
    const zap = await tx.zap.create({
      data: {
        triggerId: "",
        actions: {
          create: parsedData.data.actions.map((x, index) => ({
            actionId: x.availableactionId,
            sortingOrder: index,
          })),
        },
      },
    });

    const trigger = await tx.trigger.create({
      data:{
        triggerId : parsedData.data.availabletriggerId,
        zalId : zap.id
      }
    })

    await tx.zap.update({
      where : {
        id : zap.id
      },
      data:{
        triggerId : trigger.id
      }
    })

  });
});

router.get("/", authMiddleware, (req, res) => {
  console.log("return the lsit of zaps for the specific user");
});

router.get("/:zapId", authMiddleware, (req, res) => {});

export const zapRoutes = router;
