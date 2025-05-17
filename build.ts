import * as esbuild from 'esbuild'

// let result = await esbuild.build({
//   entryPoints: ['app.ts'],
//   bundle: true,
//   outdir: 'dist',
// })

const ctx = await esbuild.context({
  entryPoints: ['clientsrc/app.tsx', 'cabinet/login.tsx'],
  bundle: true,
  outdir: 'static/scripts',
  tsconfigRaw: `{
    "compilerOptions": {
      "jsx": "react-jsx",
      "jsxImportSource": "hono/jsx/dom"
    },
  }`,
})

await ctx.watch()
//await esbuild.stop()

