import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import clear from 'rollup-plugin-clear';
import { main, module } from './package.json';

export default {
  input: 'src/index.ts',
  plugins: [clear({ targets: ['./lib'] }), commonjs(), json(), resolve(), typescript()],
  output: [
    {
      format: 'esm',
      file: module
    },
    {
      format: 'cjs',
      file: main
    }
  ]
};
