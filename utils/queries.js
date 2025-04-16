const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function main() {
  const checkUser = await prisma.user.findMany();
  console.log(checkUser);
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
