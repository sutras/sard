import consola from 'consola'
import path from 'node:path'
import fs from 'node:fs'
import fsp from 'node:fs/promises'

export function logExistFile(file: string) {
  consola.log('[修改文件] ', file)
  return file
}

export async function writeFileWithDirs(filePath: string, content: string) {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    await fsp.mkdir(dir, { recursive: true })
  }
  await fsp.writeFile(filePath, content)
}

export async function copyFileWithDirs(src: string, dest: string) {
  const dir = path.dirname(dest)
  if (!fs.existsSync(dir)) {
    await fsp.mkdir(dir, { recursive: true })
  }
  await fsp.copyFile(src, dest)
}

export async function replaceFileContent(
  filePath: string,
  replacement: (content: string) => string,
) {
  let content = await fsp.readFile(filePath, 'utf8')
  content = replacement(content)
  logExistFile(filePath)
  await writeFileWithDirs(filePath, content)
}

export async function runSteps(steps: [stepName: string, step: () => Promise<void>][]) {
  for (const [i, [stepName, step]] of steps.entries()) {
    consola.info(`当前步骤：${i + 1}/${steps.length} ${stepName}`)
    await step()
  }
}

export async function resolvePackageJson(pkgJsonFile: string, packagesDir: string) {
  const sourcePkg = JSON.parse(await fsp.readFile(pkgJsonFile, 'utf-8'))

  // 收集所有工作区包（packages/*）的名称和版本号
  const workspaceVersions: Record<string, string> = {}
  const packageDirs = await fsp.readdir(packagesDir, { withFileTypes: true })

  for (const dirent of packageDirs) {
    if (!dirent.isDirectory()) continue
    const pkgPath = path.resolve(packagesDir, dirent.name, 'package.json')
    try {
      const pkg = JSON.parse(await fsp.readFile(pkgPath, 'utf-8'))
      if (pkg.name && pkg.version && pkg.private !== true) {
        workspaceVersions[pkg.name] = pkg.version
      }
    } catch {
      // 跳过没有 package.json 的目录
    }
  }

  // 将 workspace:* / workspace:^ 等协议替换为实际版本号
  function resolveWorkspaceDeps(deps: Record<string, string> | undefined) {
    if (!deps) return undefined
    const resolved: Record<string, string> = {}
    for (const [name, version] of Object.entries(deps)) {
      if (
        typeof version === 'string' &&
        version.startsWith('workspace:') &&
        workspaceVersions[name]
      ) {
        resolved[name] = `^${workspaceVersions[name]}`
      } else {
        resolved[name] = version as string
      }
    }
    return resolved
  }

  const distPkg = {
    ...sourcePkg,
    main: sourcePkg.main ? sourcePkg.main.replace(/\.tsx?$/, '.js') : undefined,
    module: sourcePkg.module ? sourcePkg.module.replace(/\.tsx?$/, '.js') : undefined,
    dependencies: resolveWorkspaceDeps(sourcePkg.dependencies),
    devDependencies: resolveWorkspaceDeps(sourcePkg.devDependencies),
    peerDependencies: resolveWorkspaceDeps(sourcePkg.peerDependencies),
    optionalDependencies: resolveWorkspaceDeps(sourcePkg.optionalDependencies),
  }

  return JSON.stringify(distPkg, null, 2)
}
