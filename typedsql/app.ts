import { PrismaClient } from "@prisma/client";
import { getUsers, createUser, updateUser } from "@prisma/client/sql";

const prisma = new PrismaClient();

async function main() {
  // insert
  const res = await prisma.$queryRawTyped(createUser("user1"));
  console.log(res);
  // update
  const res1 = await prisma.$queryRawTyped(updateUser("user2", 1));
  console.log(res1);
  // delete
  const res2 = await prisma.$queryRawTyped(updateUser("user2", 1));
  console.log(res2);
  // select
  const users = await prisma.$queryRawTyped(getUsers());
  console.log(users);

  // insert item with relation
  const res3 = await prisma.item.create({
    data: {
      title: "item1",
      description: "description",
      price: 100,
      user: {
        connect: {
          id: 1,
        },
      },
      transactions: {
        create: {
          status: "SUCCESS",
          seller: {
            connect: {
              id: 1,
            },
          },
          buyer: {
            connect: {
              id: 1,
            },
          },
        },
      },
    },
  });
  console.log(res3);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
