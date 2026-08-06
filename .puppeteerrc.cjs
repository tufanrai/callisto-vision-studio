const { join } = require("path");

/**
 * Keep the downloaded browser inside the project. The default (~/.cache)
 * is not writable in this environment, and a failed download rolls back the
 * entire npm install.
 */
module.exports = {
  cacheDirectory: join(__dirname, ".cache", "puppeteer"),
};
