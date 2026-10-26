import path from 'node:path'
import { existsSync, globSync } from 'node:fs'
import { transformSync as babelTransformSync } from '@babel/core'
import { transformSync as oxcTransformSync, TransformOptions } from 'oxc-transform'
import * as compiler from 'vue/compiler-sfc'
import { rolldown, RolldownPluginOption } from 'rolldown'

export function transformTs(file: string, code: string, lang: TransformOptions['lang'] = 'ts') {
  return oxcTransformSync(file, code, {
    jsx: 'preserve',
    lang,
    target: 'esnext',
  }).code
}

export function transformJSX(code: string) {
  return (
    babelTransformSync(code, {
      plugins: ['@vue/babel-plugin-jsx'],
    })?.code || ''
  )
}

export function transformVue(code: string, file: string) {
  const { descriptor } = compiler.parse(code, {
    filename: file,
  })

  const scriptBlock = compiler.compileScript(descriptor, {
    id: file,
    inlineTemplate: true,
  })

  const content = transformTs(
    file,
    scriptBlock.content,
    (scriptBlock.lang as 'ts' | 'js' | undefined) || 'js',
  )

  return transformJSX(content)
}

/**
 * 源码里组件入口通过 `import './index.scss'` 引入样式，
 * 产物里样式已被编译成同名的 `.css`，这里把引用改成 `.css` 并作为外部依赖保留，
 * 交给使用方的打包工具处理（按需引入时样式跟着组件一起进包）。
 */
export function rewriteStyleImport(code: string) {
  if (!code.includes('.scss')) return code

  return code.replace(
    /((?:from|import)\s*\(?\s*)(["'])([^"']+)\.scss\2/g,
    (_matched, prefix: string, quote: string, specifier: string) => {
      return `${prefix}${quote}${specifier}.css${quote}`
    },
  )
}

function transformPlugin(): RolldownPluginOption {
  return {
    name: 'transform',
    async resolveId(source, importer) {
      if (source.startsWith('.') && importer) {
        const baseDir = path.dirname(importer)
        const resolved = path.resolve(baseDir, source)

        const extensions = ['.ts', '.tsx', '/index.ts', '/index.tsx', '.js']
        for (const ext of extensions) {
          const fullPath = `${resolved}${ext}`
          if (existsSync(fullPath)) return fullPath
        }
      }
    },
    transform(code, id) {
      if (id.endsWith('.ts')) {
        return rewriteStyleImport(transformTs(id, code))
      }
      if (id.endsWith('.tsx')) {
        return rewriteStyleImport(transformJSX(transformTs(id, code, 'tsx')))
      }
      if (id.endsWith('.jsx')) {
        return rewriteStyleImport(transformJSX(code))
      }
      if (id.endsWith('.vue')) {
        return rewriteStyleImport(transformVue(code, id))
      }
    },
  }
}

export async function compileAllScript(options: {
  rootDir: string
  outDir: string
  externals: string[]
  exclude: string[]
}) {
  const { rootDir, outDir, externals, exclude } = options

  const files = globSync(`${rootDir}/**/*.{vue,js,jsx,ts,tsx}`, {
    exclude,
  })

  const bundle = await rolldown({
    input: files,
    external: (source) =>
      source.endsWith('.css') || externals.some((item) => source.startsWith(item)),
    treeshake: {},
    plugins: [transformPlugin()],
    logLevel: 'silent',
  })

  await bundle.write({
    format: 'esm',
    dir: outDir,
    preserveModules: true,
    preserveModulesRoot: rootDir,
    entryFileNames(chunkInfo) {
      const id = chunkInfo.facadeModuleId?.replace(/\?.*$/, '') ?? ''
      if (id.endsWith('.vue')) {
        return '[name].vue.js'
      }
      return '[name].js'
    },
  })
}
