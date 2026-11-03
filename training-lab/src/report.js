function createDailyReport(records) {
  return records.map((record) => `${record.id}: ${record.name}`).join("\n");
}

module.exports = { createDailyReport };