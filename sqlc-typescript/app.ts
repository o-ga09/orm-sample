import { createPool, PoolConnection } from "mysql2/promise";
import {
  createAuthor,
  deleteAuthor,
  getAuthor,
  listUser,
  updateAuthor,
} from "./generated/query_sql";
import dotenv from 'dotenv';

dotenv.config();

// Create a MySQL connection
export const createConnection = async () => {
  const pool = await createPool({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  return await pool.getConnection();
};

async function main() {
  const dbconnection = await createConnection();
  // get User
  const res = await getAuthor(dbconnection, { id: 1 });
  console.log(res);

  // list User
  const res1 = await listUser(dbconnection);
  console.log(res1);

  // insert user
  await createAuthor(dbconnection, { name: "user1", bio: "bio" });

  // update User
  await updateAuthor(dbconnection, {
    name: "user2",
    bio: "bio",
    id: 1,
  });

  // delete User
  await deleteAuthor(dbconnection, { id: 1 });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
