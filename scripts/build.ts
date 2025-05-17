import * as esbuild from 'esbuild'

// let result = await esbuild.build({
//   entryPoints: ['app.ts'],
//   bundle: true,
//   outdir: 'dist',
// })

let ctx = await esbuild.context({
  entryPoints: ['clientsrc/app.tsx'],
  bundle: true,
  outdir: '../static/scripts',
})

await ctx.watch()
//await esbuild.stop()

