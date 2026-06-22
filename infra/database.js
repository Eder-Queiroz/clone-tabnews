import { Client } from "pg";

async function query(queryObj) {
  const client = await getNewClient();

  try {
    const result = await client.query(queryObj);

    return result;
  } catch (e) {
    throw e;
  } finally {
    await client.end();
  }
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();
  return client;
}

export default {
  query,
  getNewClient,
};
