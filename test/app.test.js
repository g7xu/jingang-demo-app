const { test } = require("node:test");
const assert = require("node:assert/strict");
const app = require("../app.js");

function withServer(fn) {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, async () => {
      const base = `http://127.0.0.1:${server.address().port}`;
      try {
        await fn(base);
        resolve();
      } catch (err) {
        reject(err);
      } finally {
        server.close();
      }
    });
  });
}

test("POST /profile merges preferences over defaults", () =>
  withServer(async (base) => {
    const res = await fetch(`${base}/profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ theme: "dark" }),
    });
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { theme: "dark", notifications: true });
  }));

test("GET /tags returns unique tags", () =>
  withServer(async (base) => {
    const res = await fetch(`${base}/tags`);
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), ["node", "express"]);
  }));
