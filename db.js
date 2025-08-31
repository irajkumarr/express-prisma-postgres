const { PrismaClient } = require("./generated/prisma");

const prisma = new PrismaClient({});

prisma
  .$connect()
  .then(() => {
    console.log("Connected to database successfully");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

module.exports = prisma;
