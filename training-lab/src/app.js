const app = {
  name: "training-lab",
  version: 1,
  status: "ready",
};

function formatStatus(config) {
  return `${config.name} v${config.version}: ${config.status}`;
}

if (require.main === module) {
  process.stdout.write(`${formatStatus(app)}\n`);
}

module.exports = { formatStatus };