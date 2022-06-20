import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import clear from 'rollup-plugin-clear';
import path from 'path';
import { main, module } from './package.json';

const typescriptOption = {
  sourceMap: false,
  outputToFilesystem: true,
  compilerOptions: {
    rootDir: './src',
    outDir: path.dirname(module)
  }
};

export default {
  input: 'src/index.ts',
  plugins: [clear({ targets: ['./lib'] }), json(), resolve(), typescript(typescriptOption), commonjs()],
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
