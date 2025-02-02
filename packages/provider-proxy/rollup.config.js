import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

const config = {
    input: './src/index.ts',
    output: {
        dir: 'dist',
        format: 'cjs',
    },
    plugins: [
        terser(),
        nodeResolve({
            preferBuiltins: false,
            mainFields: ['module', 'main'],
            rootDir: '../..',
            customResolveOptions: {
                moduleDirectories: ['../../node_modules'],
            },
        }),
        typescript({
            compilerOptions: {
                declaration: false,
                declarationMap: false,
                tsconfig: 'tsconfig.json',
            },
        }),
        commonjs({
            dynamicRequireTargets: ['!@masknet/shared-base/crypto'],
        }),
        json(),
    ],
}

export default config
