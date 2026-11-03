const assert = require("node:assert/strict");
const test = require("node:test");

const { formatStatus } = require("../src/app");

test("formats the application status", () => {
  assert.equal(
    formatStatus({ name: "training-lab", version: 1, status: "ready" }),
    "training-lab v1: ready",
  );
});