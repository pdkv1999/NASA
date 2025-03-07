// Importing the Pino logging library
const pino = require("pino");

// Creating and exporting a default Pino logger instance
// The empty object {} means it will use Pino's default settings:
// - Log level: 'info' (includes info, warn, error, fatal levels)
// - Output format: JSON for structured logging
// - Timestamp: Included by default for each log entry
// - High performance and low overhead suitable for production
module.exports = pino({});
