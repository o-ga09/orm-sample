import { PrismaClient } from "@prisma/client";
import { getUsers, createUser, updateUser } from "@prisma/client/sql";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();
const MAX_RECORD = 100000;
const CUNK_RECORD = 10000;

const insert_data = async () => {
  for (let i = 0; i < MAX_RECORD / CUNK_RECORD; i++) {
    const cunksUser: {
      userId: string;
      sex: string;
      birthday: string;
      password: string;
      name: string;
      email: string;
      insert_datetime: string;
      update_datetime: string;
    }[] = [];

    const chunkItem: {
      userId: number;
      title: string;
      description: string;
      price: number;
      createdAt: Date;
      updatedAt: Date;
    }[] = [];

    const chunkTransaction: {
      sellerId: number;
      buyerId: number;
      itemId: number;
      status: string;
      createdAt: Date;
      updatedAt: Date;
    }[] = [];

    Array(CUNK_RECORD)
      .fill(0)
      .forEach((_, i) => {
        const userId = uuidv4();
        const sex = String(Math.random() % 2);

        cunksUser.push({
          userId: userId,
          sex: sex,
          birthday: new Date(Math.random()).toString(),
          password: "password",
          name: `user${i}`,
          email: ``,
          insert_datetime: new Date(Math.random()).toISOString(),
          update_datetime: new Date(Math.random()).toISOString(),
        });

        chunkItem.push({
          userId: i + 1,
          title: `title${i}`,
          description: `description${i}`,
          price: i,
          createdAt: new Date(Math.random()),
          updatedAt: new Date(Math.random()),
        });

        chunkTransaction.push({
          sellerId: i + 1,
          buyerId: i + 1,
          itemId: i + 1,
          status: "sold",
          createdAt: new Date(Math.random()),
          updatedAt: new Date(Math.random()),
        });
      });
    await prisma.user.createMany({ data: cunksUser });
    await prisma.item.createMany({ data: chunkItem });
    await prisma.transaction.createMany({ data: chunkTransaction });
    console.log(`inserted ${i + 1 * CUNK_RECORD} records`);
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
