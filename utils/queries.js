const prisma = require("./prisma.js");

async function main() {
  const folder = await prisma.folder.findMany({
    include: {
      files: true,
    }
  });
  console.log(JSON.stringify(folder, null, 2));
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