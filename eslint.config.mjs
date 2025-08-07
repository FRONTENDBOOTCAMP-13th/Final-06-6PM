import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // 기본 규칙
      "no-unused-vars": "warning", // 사용하지 않는 변수 금지
      "prefer-const": "warn", // 재할당하지 않으면 const 사용
      "no-var": "error", // var 사용 금지
      "no-redeclare": "error", // 같은 변수명 재선언 금지
      "no-unreachable": "error", // return 후 코드 작성 등 도달 불가능한 코드 금지

      // TS 관련 규칙
      "@typescript-eslint/no-explicit-any": "warn", // any 타입 사용시 경고

      // 코드 스타일
      quotes: ["warning", "double"], // 쌍따옴표 사용
      semi: ["error", "always"], // 세미콜론 강제
    },
  },
];

export default eslintConfig;
