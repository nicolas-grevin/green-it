import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: [
    'src/app.js',
  ],
  platform: 'node',
  bundle: true,
  minify: true,
  target: 'node21',
  format: 'esm',
  outfile: 'app.mjs',
  outExtension: {
    '.js': '.mjs'
  },
  external: [
    'express',
    'pg',
  ],
  packages: 'external',
})
