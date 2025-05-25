import * as esbuild from 'esbuild'

// let result = await esbuild.build({
//   entryPoints: ['app.ts'],
//   bundle: true,
//   outdir: 'dist',
// })

const ctx = await esbuild.context({
 
  entryPoints: ['clientsrc/app.tsx', 'auth/login.tsx', 'cabinet/cabinetLayout.ts'],
  bundle: true,
  outdir: 'static/scripts',
  tsconfigRaw: `{
    "compilerOptions": {
      "jsx": "react-jsx",
      "jsxImportSource": "hono/jsx/dom",
      "target": "ES2020",
      "experimentalDecorators": true,
      "useDefineForClassFields": false,
       "module": "ESNext",
      "lib": ["ES2020", "DOM", "DOM.Iterable"],
      "skipLibCheck": true,
    },
  }`,
})

await ctx.watch()
//await esbuild.stop()

