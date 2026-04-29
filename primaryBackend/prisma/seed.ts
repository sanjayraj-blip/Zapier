import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.availableAction.deleteMany();
  await prisma.availableTrigger.deleteMany();

  const triggers = await prisma.availableTrigger.createMany({
    data: [
      {
        name: "Webhook Trigger",
      },
      {
        name: "Gmail",
      },
      {
        name: "Scheduled Time",
      },
      {
        name: "Database Event",
      },
      {
        name: "Form Submission",
      },
    ],
  });

  const actions = await prisma.availableAction.createMany({
    data: [
      {
        name: "Send Email",
      },
      {
        name: "Send Slack Message",
      },
      {
        name: "Save to Database",
      },
      {
        name: "Send HTTP Request",
      },
      {
        name: "Send SMS",
      },
      {
        name: "Create Notion Page",
      },
      {
        name: "Add Google Sheet Row",
      },
      {
        name: "Discord Message",
      },
      {
        name: "Solana",
      },
    ],
  });

  console.log("✅ Seeding completed!");
  console.log(`📌 Created ${triggers.count} triggers`);
  console.log(`📌 Created ${actions.count} actions`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
