import { PrismaClient } from "@prisma/client";
import { getUsers, createUser, updateUser } from "@prisma/client/sql";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();
const MAX_RECORD = 100000;

const insert_data = async () => {
  for (let i = 0; i < MAX_RECORD; i++) {
    const userId = uuidv4();
    const sex = String(Math.random() % 2);

    await prisma.user.create({
      data: {
        userId: userId,
        sex: sex,
        birthday: new Date(Math.random()).toString(),
        password: "password",
        name: `user${i}`,
        email: ``,
        insert_datetime: new Date(Math.random()).toISOString(),
        update_datetime: new Date(Math.random()).toISOString(),
        items: {
          create: {
            title: "item1",
            description: "description",
            price: 100,
            transactions: {
              create: {
                status: "SUCCESS",
                seller: {
                  connect: {
                    userId: userId,
                  },
                },
                buyer: {
                  connect: {
                    userId: userId,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
};

insert_data()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
