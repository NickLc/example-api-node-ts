/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    'test/(.*)': '<rootDir>/test/$1'
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,ts}']
}
