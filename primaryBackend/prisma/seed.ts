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
        image: "https://cdn-icons-png.flaticon.com/512/1995/1995467.png",
      },
      {
        name: "Gmail",
        image: "https://cdn-icons-png.flaticon.com/512/732/732200.png",
      },
      {
        name: "Scheduled Time",
        image: "https://cdn-icons-png.flaticon.com/512/2838/2838839.png",
      },
      {
        name: "Database Event",
        image: "https://cdn-icons-png.flaticon.com/512/4248/4248443.png",
      },
      {
        name: "Form Submission",
        image: "https://cdn-icons-png.flaticon.com/512/924/924514.png",
      },
    ],
  });

  const actions = await prisma.availableAction.createMany({
    data: [
      {
        name: "Send Email",
        image: "https://cdn-icons-png.flaticon.com/512/3062/3062646.png",
      },
      {
        name: "Send Slack Message",
        image: "https://cdn-icons-png.flaticon.com/512/3291/3291695.png",
      },
      {
        name: "Save to Database",
        image: "https://cdn-icons-png.flaticon.com/512/4248/4248443.png",
      },
      {
        name: "Send HTTP Request",
        image: "https://cdn-icons-png.flaticon.com/512/1995/1995467.png",
      },
      {
        name: "Send SMS",
        image: "https://cdn-icons-png.flaticon.com/512/681/681494.png",
      },
      {
        name: "Create Notion Page",
        image: "https://cdn-icons-png.flaticon.com/512/1995/1995573.png",
      },
      {
        name: "Add Google Sheet Row",
        image: "https://cdn-icons-png.flaticon.com/512/2038/2038582.png",
      },
      {
        name: "Discord Message",
        image: "https://cdn-icons-png.flaticon.com/512/2111/2111370.png",
      },
      {
        name: "Solana",
        image: "https://cdn-icons-png.flaticon.com/512/5968/5968836.png",
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
