import { PrismaClient } from "@prisma/client";

import { data } from "./category.js";
const prisma = new PrismaClient();
console.log(data);

async function seedCategories() {
  await prisma.category.createMany({
    data,
  });
  console.log("Seeded categories table with data:");
  console.log(data);
}

seedCategories()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

export default seedCategories;
