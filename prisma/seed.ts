import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 12);

  await prisma.admin.upsert({
    where: { email: "admin@gigisconcept.com" },
    update: {},
    create: {
      email: "admin@gigisconcept.com",
      password: hashedPassword,
      name: "Gigi",
    },
  });

  console.log("Seed complete: admin@gigisconcept.com / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
