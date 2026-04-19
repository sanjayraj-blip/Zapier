import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import express from "express";
import { PrismaClient } from "./generated/prisma/client.js";
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const client = new PrismaClient({ adapter });
const app = express();
app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;
    await client.$transaction(async (tx) => {
        const run = await client.zapRun.create({
            data: {
                zapId: zapId,
                metadata: body,
            },
        });
        await client.zapRunOutbox.create({
            data: {
                ZapRunId: run.id,
            },
        });
    });
});
app.listen(3000, () => console.log("App is running"));
//# sourceMappingURL=index.js.map