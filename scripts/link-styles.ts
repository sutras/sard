import { existsSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import consola from 'consola'
import { libRootDir } from './config'

const compRootDir = path.join(libRootDir, 'components')

// 非视觉组件，不生成样式入口
const skipDirs = new Set(['style', 'config'])

const styleFile = 'index.scss'
const entryFile = 'style.ts'

function getCompDirs() {
  return readdirSync(compRootDir)
    .filter((name) => {
      return !skipDirs.has(name) && statSync(path.join(compRootDir, name)).isDirectory()
    })
    .sort()
}

function listSourceFiles(dir: string) {
  const result: string[] = []

  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name)
    const stat = statSync(full)

    if (stat.isDirectory()) {
      if (name === 'test' || name === '__tests__') continue
      result.push(...listSourceFiles(full))
      continue
    }

    if (!/\.(vue|tsx?|jsx?)$/.test(name)) continue
    if (/\.(test|spec)\./.test(name) || name.endsWith('.d.ts')) continue
    if (name === entryFile) continue

    result.push(full)
  }

  return result
}

const importStatementRegExp =
  /(?:^|\n)[ \t]*import\s+((?:type\s+)?(?:\{[^}]*\}|\*\s+as\s+[\w$]+|[\w$]+(?:\s*,\s*\{[^}]*\})?))\s*from\s*['"]([^'"]+)['"]/g

const reExportStatementRegExp =
  /(?:^|\n)[ \t]*export\s+((?:type\s+)?(?:\{[^}]*\}|\*(?:\s+as\s+[\w$]+)?))\s*from\s*['"]([^'"]+)['"]/g

const importSideEffectRegExp = /(?:^|\n)[ \t]*import\s*['"]([^'"]+)['"]/g

const importDynamicRegExp = /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g

/**
 * 判断导入语句是否只引入了类型（`import type`、`export type`、`{ type A, type B }`），
 * 类型导入在运行时会被擦除，不会渲染对方组件，也就不需要带上对方的样式。
 */
function isTypeOnlyClause(clause: string) {
  const trimmed = clause.trim()

  if (/^type\b/.test(trimmed)) return true

  if (!trimmed.startsWith('{')) return false

  const specifiers = trimmed
    .replace(/^\{|\}$/g, '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  return specifiers.length > 0 && specifiers.every((item) => /^type\s/.test(item))
}

function getSpecifiers(code: string) {
  const result = new Set<string>()

  for (const regExp of [importStatementRegExp, reExportStatementRegExp]) {
    for (const matched of code.matchAll(regExp)) {
      const [, clause, specifier] = matched

      if (isTypeOnlyClause(clause)) continue

      result.add(specifier)
    }
  }

  for (const regExp of [importSideEffectRegExp, importDynamicRegExp]) {
    for (const matched of code.matchAll(regExp)) {
      result.add(matched[1])
    }
  }

  return result
}

function getDirectDeps(compName: string, compSet: Set<string>) {
  const dir = path.join(compRootDir, compName)
  const deps = new Set<string>()

  for (const file of listSourceFiles(dir)) {
    const code = readFileSync(file, 'utf8')

    for (const specifier of getSpecifiers(code)) {
      if (!specifier.startsWith('../')) continue

      const depName = specifier.split('/')[1]

      if (!depName || depName === compName || !compSet.has(depName)) continue

      // 只认渲染依赖：`../x` 目录、`../x/x.vue`、`../x/index.ts`。
      // 像 `../form/common` 这种只是复用注入 key / 组合式函数，不会渲染对方组件，不需要带样式。
      const isRenderDep =
        specifier === `../${depName}` ||
        specifier.endsWith('.vue') ||
        /\/index(\.ts)?$/.test(specifier)

      if (isRenderDep) {
        deps.add(depName)
      }
    }
  }

  return [...deps].sort()
}

function createDepResolver(compSet: Set<string>) {
  const cache = new Map<string, string[]>()

  return (compName: string) => {
    let deps = cache.get(compName)

    if (!deps) {
      deps = getDirectDeps(compName, compSet)
      cache.set(compName, deps)
    }

    return deps
  }
}

function getClosure(compName: string, getDeps: (name: string) => string[]) {
  const visited = new Set<string>()
  const ordered: string[] = []

  const walk = (name: string) => {
    for (const dep of getDeps(name)) {
      if (visited.has(dep) || dep === compName) continue
      visited.add(dep)
      // 依赖的依赖先入队，保证被依赖方的样式排在前面
      walk(dep)
      ordered.push(dep)
    }
  }

  walk(compName)

  return ordered
}

function hasStyle(compName: string) {
  return existsSync(path.join(compRootDir, compName, styleFile))
}

function buildStyleEntry(compName: string, deps: string[]) {
  const lines = [`// 组件样式入口，由 pnpm link:styles 生成，请勿手动修改`]

  lines.push(`import '../style/${styleFile}'`)

  for (const dep of deps) {
    // 组合型组件（如 datetime-picker）没有自己的样式文件，其样式由依赖组件提供
    if (!hasStyle(dep)) continue
    lines.push(`import '../${dep}/${styleFile}'`)
  }

  if (hasStyle(compName)) {
    lines.push(`import './${styleFile}'`)
  }

  return `${lines.join('\n')}\n`
}

/**
 * 生成组件样式入口。
 *
 * 默认会扫描全部组件，只写入内容有变化的文件；传 `entries` 时只处理指定组件
 * （依赖图按需解析，不会读其它组件），供新建组件流程使用。
 */
export function linkStyles(options: { entries?: string[] } = {}) {
  const compDirs = getCompDirs()
  const compSet = new Set(compDirs)
  const getDeps = createDepResolver(compSet)

  const targets = options.entries ?? compDirs

  let written = 0
  let removed = 0

  for (const compName of targets) {
    if (!compSet.has(compName)) {
      consola.warn(`组件 ${compName} 不存在，跳过`)
      continue
    }

    const target = path.join(compRootDir, compName, entryFile)
    const deps = getClosure(compName, getDeps)

    // 既没有自有样式、也没有渲染依赖的组件不需要样式入口
    if (!hasStyle(compName) && deps.length === 0) {
      if (existsSync(target)) {
        rmSync(target)
        removed++
      }
      continue
    }

    const content = buildStyleEntry(compName, deps)
    const current = existsSync(target) ? readFileSync(target, 'utf8') : ''

    if (current !== content) {
      writeFileSync(target, content)
      written++
    }
  }

  consola.success(
    `样式入口已生成：${written} 个写入，${removed} 个移除，共 ${targets.length} 个组件`,
  )
}

if (process.argv[1]?.includes('link-styles')) {
  linkStyles()
}
