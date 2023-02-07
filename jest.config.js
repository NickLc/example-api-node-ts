/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    'test/(.*)': '<rootDir>/test/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@user/(.*)$': '<rootDir>/src/modules/user/$1',
    '^@db/(.*)$': '<rootDir>/src/db/$1'
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,ts}']
}
