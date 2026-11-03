const assert = require("node:assert/strict");
const test = require("node:test");

const { formatStatus } = require("../src/app");
const { createDailyReport } = require("../src/report");

test("formats the application status", () => {
  assert.equal(
    formatStatus({ name: "training-lab", version: 1, status: "ready" }),
    "training-lab v1: ready",
  );
});

test("formats records as a daily report", () => {
  assert.equal(
    createDailyReport([{ id: 1, name: "Asha" }, { id: 2, name: "Dev" }]),
    "1: Asha\n2: Dev",
  );
});