import consola from 'consola'
import inquirer from 'inquirer'
import { camelCase, kebabCase, upperFirst } from 'lodash-es'
import path from 'node:path'
import { createComponentVue, declareGlobalComponent, exportComponent } from './utils/comp-skeleton'
import fs from 'node:fs/promises'
import { libRootDir } from './config'
import { runSteps } from './utils/utils'

async function createSubComponent(compDir: string, kebabCaseName: string, pascalCaseName: string) {
  await createComponentVue(compDir, kebabCaseName, pascalCaseName)
}

async function newSubComponent() {
  const compForm = await inquirer.prompt([
    {
      type: 'input',
      name: 'enName',
      message: '请输入新增组件的英文名',
    },
    {
      type: 'input',
      name: 'mainName',
      message: '请输入新增组件的主组件',
    },
  ])

  for (const [name, value] of Object.entries(compForm)) {
    if (!value) {
      consola.error(`${name}不能为空`)
      process.exit(1)
    }
  }

  for (const k in compForm) {
    compForm[k] = compForm[k].trim()
  }

  consola.info(compForm)

  const confirmForm = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: '确定新增组件？',
      default: false,
    },
  ])

  if (!confirmForm.confirm) {
    consola.error('已取消新增组件')
    process.exit(1)
  }

  const kebabCaseName = kebabCase(compForm.enName)
  const camelCaseName = camelCase(compForm.enName)
  const pascalCaseName = upperFirst(camelCaseName)

  const mainKebabCaseName = kebabCase(compForm.mainName)

  const compDir = path.resolve(libRootDir, `components/${mainKebabCaseName}`)

  try {
    await fs.access(compDir)
  } catch {
    consola.error(`目录不存在: ${compDir}`)
    process.exit(1)
  }

  await runSteps([
    ['创建组件源码等相关文件', () => createSubComponent(compDir, kebabCaseName, pascalCaseName)],
    ['导出组件模块', () => exportComponent(kebabCaseName, pascalCaseName, true)],
    [
      '声明全局组件',
      () => declareGlobalComponent(kebabCaseName, pascalCaseName, mainKebabCaseName),
    ],
  ])

  consola.success('成功新增组件')
}

newSubComponent()
