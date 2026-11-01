module.exports = {
  testEnvironment: "jsdom",
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(test).[jt]s?(x)",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/tests/",
  ],
};
