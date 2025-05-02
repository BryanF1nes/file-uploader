const prisma = require("./prisma.js");

async function main() {
  const folder = await prisma.user.findMany({
    include: {
      folders: true,
    }
  });
  console.log(folder);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})