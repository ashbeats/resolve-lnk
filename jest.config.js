// https://jestjs.io/docs/en/configuration.html
module.exports = {
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  roots: ["tests/"],
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/test__*",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ]
};
