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

test("Post to /api/v1/migrations should return 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response1.status).toBe(201);

  const response1Body = await response1.json();

  expect(Array.isArray(response1Body)).toBe(true);
  expect(response1Body.length).toBeGreaterThan(0);
  const quantityMigrationApplyed = await getQuantityMigrationApplyed();
  expect(response1Body.length).toEqual(quantityMigrationApplyed);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response2.status).toBe(200);

  const response2Body = await response2.json();

  expect(Array.isArray(response2Body)).toBe(true);
  expect(response2Body.length).toBe(0);
});
