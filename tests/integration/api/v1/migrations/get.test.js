import database from "infra/database";

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

async function getQuantityMigrationApplyed() {
  const [databaseQuantityMigrationsApplyed] = (
    await database.query("select count(*)::int from pgmigrations;")
  ).rows;

  return databaseQuantityMigrationsApplyed.count;
}

beforeAll(cleanDatabase);

test("Get to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
  const quantityMigrationApplyed = await getQuantityMigrationApplyed();
  expect(quantityMigrationApplyed).toEqual(0);
});
