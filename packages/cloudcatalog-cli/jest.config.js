module.exports = {
  roots: ["<rootDir>"],
  testMatch: ["**/?(*.)+(spec|test).+(ts|tsx|js)"],
  setupFilesAfterEnv: ["<rootDir>/jest/custom-matchers.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
