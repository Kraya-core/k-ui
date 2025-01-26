// import resolve from "@rollup/plugin-node-resolve";
// import commonjs from "@rollup/plugin-commonjs";
// import typescript from "@rollup/plugin-typescript";
// import peerDepsExternal from "rollup-plugin-peer-deps-external";
// import postcss from "rollup-plugin-postcss";

// export default {
//   input: "src/index.ts",
//   output: [
//     {
//       file: "dist/index.js",
//       format: "cjs",
//       sourcemap: true,
//     },
//     {
//       file: "dist/index.esm.js",
//       format: "esm",
//       sourcemap: true,
//     },
//   ],
//   plugins: [
//     peerDepsExternal(),
//     resolve(),
//     commonjs(),
//     typescript({ tsconfig: "./tsconfig.json" }),
//     postcss(),
//   ],
//   external: ["react", "react-dom"],
// };

import typescript from "@rollup/plugin-typescript";
import alias from "@rollup/plugin-alias";
import { dts } from "rollup-plugin-dts";
import path from "path";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      alias({
        entries: [
          {
            find: "@components",
            replacement: path.resolve(__dirname, "src/components"),
          },
        ],
      }),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "dist/types",
      }),
    ],
    external: ["react", "react-dom"], // Exclude peer dependencies
  },
  {
    input: "dist/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
