const assert = require("node:assert/strict");
const test = require("node:test");

const { formatStatus } = require("../src/app");
const { getProfile } = require("../src/profile");

test("formats the application status", () => {
  assert.equal(
    formatStatus({ name: "training-lab", version: 1, status: "ready" }),
    "training-lab v1: ready",
  );
});

test("returns a profile with a default role", () => {
  assert.deepEqual(getProfile({ name: "Asha" }), {
    displayName: "Asha",
    role: "intern",
  });
});