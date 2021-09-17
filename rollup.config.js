import path from 'path'
import RollupJson from '@rollup/plugin-json'
import RollupNodeResolve from '@rollup/plugin-node-resolve'
import RollupCommonjs from '@rollup/plugin-commonjs'
import RollupTypescript from 'rollup-plugin-typescript2'
// import { terser } from 'rollup-plugin-terser' // 代码压缩
import css from 'rollup-plugin-css-only'
// import css from 'rollup-plugin-postcss'

import Package from './package.json'

const resolveFile = filePath => path.resolve(__dirname, filePath)

const externalPackages = [
  'react',
  'react-dom',
  '@tarojs/components',
  '@tarojs/runtime',
  '@tarojs/taro',
  '@tarojs/react'
]

export default {
  input: resolveFile(Package.source),
  output: [
    {
      file: resolveFile(Package.common),
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: resolveFile(Package.module),
      format: 'es',
      sourcemap: true,
    },
    {
      file: resolveFile(Package.browser),
      format: 'umd',
      name: 'taroCanvas',
      sourcemap: true,
      globals: {
        react: 'React',
        '@tarojs/components': 'components',
        '@tarojs/taro': 'Taro',
      },
    },
  ],
  external: externalPackages,
  plugins: [
    RollupNodeResolve({
      moduleDirectories: ['node_modules']
    }),
    RollupCommonjs({
      include: [/\/node_modules\//],
    }),
    RollupJson(),
    RollupTypescript({
      tsconfig: resolveFile('tsconfig.rollup.json'),
    }),
    // terser(),
    css({output: 'index.css'}),
  ],
}
