module.exports = {
    preset: 'jest-preset-angular',
    testMatch: ['**/+(*.)+(spec).(pact).(ts)'],
    testURL: 'http://localhost:8181',
    setupFilesAfterEnv: ['./jest.setup.ts']
};