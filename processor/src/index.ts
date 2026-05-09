import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { Kafka } from "kafkajs";
import { PrismaClient } from "./generated/prisma/client.js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const client = new PrismaClient({ adapter });

const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

async function main() {
  const producer = kafka.producer({
    allowAutoTopicCreation: true,
  });
  await producer.connect();
  console.log("Producer connected");

  while (1) {
    const pendingRows = await client.zapRunOutbox.findMany({
      where: {},
      take: 10,
    });

    console.log(`Found ${pendingRows.length} pending rows`);

    if (pendingRows.length > 0) {
      await producer.send({
        topic: TOPIC_NAME,
        messages: pendingRows.map((r: any) => ({
          value: JSON.stringify({ zapRunId: r.ZapRunId, stage: 0 }),
        })),
      });

      console.log(`Sent ${pendingRows.length} messages to Kafka`);

      await client.zapRunOutbox.deleteMany({
        where: {
          id: {
            in: pendingRows.map((x: any) => x.id),
          },
        },
      });

      console.log("Deleted processed rows");
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

main();
