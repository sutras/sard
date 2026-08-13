import child_process from 'node:child_process'
import consola from 'consola'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

const npmRegistry = 'https://registry.npmjs.org/'

async function checkLogin() {
  return new Promise((resolve, reject) => {
    child_process.exec(`npm whoami --registry ${npmRegistry} -ws=false`, (error, stdout) => {
      if (error) {
        reject(error)
      } else {
        resolve(stdout)
      }
    })
  })
}

async function login() {
  return new Promise<void>((resolve, reject) => {
    const child = child_process.spawn(`npm`, ['login', '--registry', npmRegistry, '-ws=false'], {
      shell: true,
      stdio: 'inherit',
    })

    child.on('exit', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`npm login process exited with code ${code}`))
      }
    })
  })
}

async function doPublish(outDir: string) {
  return new Promise<void>((resolve, reject) => {
    const child = child_process.spawn(
      `npm`,
      ['publish', '--access', 'public', '--registry', npmRegistry, '-ws=false'],
      {
        stdio: 'inherit',
        cwd: outDir,
        shell: true,
      },
    )

    child.on('exit', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`npm publish process exited with code ${code}`))
      }
    })
  })
}

export async function publish(outDir: string) {
  if (!existsSync(resolve(outDir, 'package.json'))) {
    consola.error('请先完成构建')
    process.exit(1)
  }

  try {
    consola.start('检查npm登录状态')
    await checkLogin()
    consola.success('已登录npm')
  } catch {
    consola.info('请先登录npm')

    try {
      await login()
      consola.success('登录成功')
    } catch (error) {
      consola.error('登录失败', error)
      process.exit(1)
    }
  }

  consola.start('正在发布')

  try {
    await doPublish(outDir)
    consola.success('发布成功')
  } catch (error) {
    consola.error('发布失败', error)
    process.exit(1)
  }
}
