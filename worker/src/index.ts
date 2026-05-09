//we need to write the consumer logic of the kafka

/*
current action {
  id: '953e5b23-2880-463d-947e-78595b0e52ac',
  zapId: '57b00d4d-7688-45fb-8d18-c119b5f09aa1',
  actionId: 'c8c9047d-b6c7-4dd3-9dcc-37730ae70fb8',
  metadata: { body: 'j jk j ijniubiu', email: 'uybyuv uyv' },
  sortingOrder: 0,
  type: {
    id: 'c8c9047d-b6c7-4dd3-9dcc-37730ae70fb8',
    name: 'Send Email',
    image: 'https://cdn-icons-png.flaticon.com/512/3062/3062646.png'
  }
}
zap {
  id: '70ea647e-84a0-49df-8fab-7ed8e492bd6a',
  zapId: '57b00d4d-7688-45fb-8d18-c119b5f09aa1',
  metadata: {
    comment: {
      To: 'karish@gmailpoqjfioiqwf.com',
      body: 'Test-MIkjq vngweignvwiqfn '
    }
  },
  zap: {
    id: '57b00d4d-7688-45fb-8d18-c119b5f09aa1',
    userId: 2,
    triggerId: '5793d528-f906-45d1-9dd6-93af3c2f7282',
    actions: [ [Object] ]
  }
}
*/

import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { Kafka } from "kafkajs";
import { sendEmail } from "./email.js";
import { PrismaClient } from "./generated/prisma/client.js";
import { parse } from "./parser.js";

const TOPIC_NAME = "zap-events";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prismaClient = new PrismaClient({ adapter });

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

async function main() {
  const consumer = kafka.consumer({ groupId: "main-worker-K" });
  await consumer.connect();

  const producer = kafka.producer({
    allowAutoTopicCreation: true,
  });
  await producer.connect();

  await consumer.subscribe({ topic: TOPIC_NAME });

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });

      if (!message.value?.toString()) {
        return;
      }

      let parsedValue;
      try {
        parsedValue = JSON.parse(message.value?.toString());
      } catch (error) {
        console.log("Failed to parse message, skipping:", error);
        await consumer.commitOffsets([
          {
            topic: TOPIC_NAME,
            partition: partition,
            offset: (parseInt(message.offset) + 1).toString(),
          },
        ]);
        return;
      }

      const zapRunId = parsedValue.zapRunId;
      const stage = parsedValue.stage;

      const zapRunDetails = await prismaClient.zapRun.findFirst({
        where: {
          id: zapRunId,
        },
        include: {
          zap: {
            include: {
              actions: {
                include: {
                  type: true,
                },
              },
            },
          },
        },
      });

      const currentAction = zapRunDetails?.zap.actions.find(
        (x: any) => x.sortingOrder == stage,
      );
      console.log("current action", currentAction);
      console.log("zap", zapRunDetails);

      if (!currentAction) {
        console.log("current action not found");
        return;
      }

      if (currentAction.type.name === "Send Email") {
        const zapRunMetadata = zapRunDetails?.metadata;
        const fromTemplate = (currentAction.metadata as any)?.email as string;
        const bodyTemplate = (currentAction.metadata as any)?.body as string;

        const from = fromTemplate.includes("{") ? parse(fromTemplate, zapRunMetadata) : fromTemplate;
        const body = parse(bodyTemplate, zapRunMetadata);
        const to = parse("{comment.to}", zapRunMetadata);

        await sendEmail(from, to, body);
        console.log(`Sent email from ${from} to ${to}`);
      }

      await new Promise((r) => setTimeout(r, 500));
      console.log("done");

      const lastStage = (zapRunDetails?.zap.actions?.length || 1) - 1;

      if (lastStage !== stage) {
        await producer.send({
          topic: TOPIC_NAME,
          messages: [
            {
              value: JSON.stringify({
                stage: stage + 1,
                zapRunId,
              }),
            },
          ],
        });
      }

      await consumer.commitOffsets([
        {
          topic: TOPIC_NAME,
          partition: partition,
          offset: (parseInt(message.offset) + 1).toString(),
        },
      ]);
    },
  });
}

main();
