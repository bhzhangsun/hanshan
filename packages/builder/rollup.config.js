import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2'; // 编译耗时30s
// import typescript from '@rollup/plugin-typescript'; // 编译耗时60s
import babel from '@rollup/plugin-babel';
import clear from 'rollup-plugin-clear';
import { main, module } from './package.json';

export default {
  input: 'src/index.ts',
  plugins: [
    clear({ targets: ['./lib'] }),
    resolve(),
    commonjs(),
    json(),
    typescript(),
    babel({ babelHelpers: 'bundled', extensions: ['ts', '.tsx'] })
  ],
  output: [
    {
      format: 'esm',
      file: module
    },
    {
      format: 'umd',
      file: main,
      name: '$builder'
    }
  ]
};
