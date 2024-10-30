/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },
  testMatch: ["**/tests/**/*.test.ts", "**/?(*.)+(spec|test).[tj]s?(x)"], // 테스트 파일 경로 설정
};
