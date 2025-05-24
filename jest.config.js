module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/src/**/*.test.ts'],  // Ищем тесты рядом с решениями
  moduleDirectories: ['node_modules', 'src'], // Для корректного импорта
};