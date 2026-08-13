import fsp from 'node:fs/promises'
import path from 'node:path'
import { libRootDir } from '../config'
import { replaceFileContent, writeFileWithDirs } from './utils'
import consola from 'consola'

const srcDir = path.resolve(process.cwd(), 'src')

export function logNewFile(file: string) {
  consola.log('[创建文件] ', file)
  return file
}

// *.vue
export async function createComponentVue(
  compDir: string,
  kebabCaseName: string,
  pascalCaseName: string,
) {
  await writeFileWithDirs(
    logNewFile(path.resolve(compDir, `${kebabCaseName}.vue`)),
    `<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBem } from '../../utils'
import {
  type ${pascalCaseName}Props,
  type ${pascalCaseName}Slots,
  type ${pascalCaseName}Emits,
  type ${pascalCaseName}Expose,
  default${pascalCaseName}Props,
} from './common'


const props = withDefaults(defineProps<${pascalCaseName}Props>(), default${pascalCaseName}Props)

defineSlots<${pascalCaseName}Slots>()

defineEmits<${pascalCaseName}Emits>()

const bem = createBem('${kebabCaseName}')

// main

// others
defineExpose<${pascalCaseName}Expose>({})
</script>`,
  )
}

// common.ts
export async function createComponentCommon(compDir: string, pascalCaseName: string) {
  await writeFileWithDirs(
    logNewFile(path.resolve(compDir, `common.ts`)),
    `import { type DefaultProps } from '../config'

export interface ${pascalCaseName}Props {
}

export const default${pascalCaseName}Props: DefaultProps<${pascalCaseName}Props> = {}

export interface ${pascalCaseName}Slots {
  default?(props: Record<string, never>): any
}

export interface ${pascalCaseName}Emits {}

export interface ${pascalCaseName}Expose {}
`,
  )
}

// index.scss
export async function createComponentIndexScss(compDir: string, kebabCaseName: string) {
  await writeFileWithDirs(
    logNewFile(path.resolve(compDir, `index.scss`)),
    `@use '../style/base' as *;

// #region variables
:root {}
// #endregion variables

@include b(${kebabCaseName}) {
  @include e(element) {

    @include m(modifier) {
    }
  }

  @include m(modifier) {
  }
}
`,
  )
}

// index.ts
export async function createComponentIndex(
  compDir: string,
  kebabCaseName: string,
  pascalCaseName: string,
) {
  await writeFileWithDirs(
    logNewFile(path.resolve(compDir, `index.ts`)),
    `import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _${pascalCaseName} from './${kebabCaseName}.vue'

export const ${pascalCaseName}: EnhancedComponent<typeof _${pascalCaseName}> = enhanceComponent(_${pascalCaseName})
export default ${pascalCaseName}

export type { ${pascalCaseName}Props, ${pascalCaseName}Slots, ${pascalCaseName}Emits, ${pascalCaseName}Expose } from './common'
`,
  )
}

// README.md
export async function createComponentReadme(
  compReadmePath: string,
  kebabCaseName: string,
  pascalCaseName: string,
  cnName: string,
  groupCnName: string,
) {
  await writeFileWithDirs(
    logNewFile(compReadmePath),
    `---
title: ${pascalCaseName}
subtitle: ${cnName}
group: ${groupCnName}
---

## 介绍

${pascalCaseName}

## 代码演示

### 基础使用

<<< @demo/${kebabCaseName}/demo/Basic.vue

## API

### ${pascalCaseName}Props

| 属性       | 描述           | 类型       | 默认值 |
| ---------- | -------------- | ---------- | ------ |
|            |                |            | -      |

### ${pascalCaseName}Slots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### ${pascalCaseName}Emits

| 事件  | 描述       | 类型                 |
| ----- | ---------- | -------------------- |
|       |            |                      |

### ${pascalCaseName}Expose

| 属性  | 描述         | 类型       |
| ----- | ------------ | ---------- |
|       |              |            |

`,
  )
}

export async function createDemo(kebabCaseName: string, pascalCaseName: string, cnName: string) {
  const demoDir = path.resolve(srcDir, `views/components/${kebabCaseName}`)

  try {
    await fsp.access(demoDir)
    consola.error(`案例目录已存在: ${demoDir}`)
    process.exit(1)
  } catch {
    void 0
  }

  // index.vue
  await writeFileWithDirs(
    logNewFile(path.resolve(demoDir, `index.vue`)),
    `<template>
  <doc-page title="${pascalCaseName} ${cnName}">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'

</script>

`,
  )

  // Basic.vue
  await writeFileWithDirs(
    logNewFile(path.resolve(demoDir, `demo/Basic.vue`)),
    `<template>
  <s-${kebabCaseName}></s-${kebabCaseName}>
</template>
`,
  )
}

export async function exportStyle(kebabCaseName: string) {
  await replaceFileContent(path.resolve(libRootDir, 'index.scss'), (content) => {
    return (
      [
        ...new Set(
          content
            .trim()
            .split(/\n+/)
            .concat([`@use './components/${kebabCaseName}/index.scss' as *;`])
            .sort(),
        ),
      ].join('\n') + '\n'
    )
  })
}

export async function exportComponent(
  kebabCaseName: string,
  pascalCaseName: string,
  isSub?: boolean,
) {
  if (!isSub) {
    await replaceFileContent(path.resolve(libRootDir, 'components/index.ts'), (content) => {
      return (
        [
          ...new Set(
            content
              .trim()
              .split(/\n+/)
              .concat([`export * from './${kebabCaseName}'`])
              .sort(),
          ),
        ].join('\n') + '\n'
      )
    })
  }

  await replaceFileContent(path.resolve(libRootDir, 'all-components.ts'), (content) => {
    const allComp = [
      ...new Set(
        content
          .split(/[{}]/)[3]
          .trim()
          .split(/\n+/)
          .map((item) => item.trim())
          .concat([`${pascalCaseName},`])
          .sort()
          .map((item) => `  ${item}`),
      ),
    ].join('\n')

    return [
      `import type { Plugin } from 'vue'`,
      `import {`,
      allComp,
      `} from './components'`,
      '',
      `export default {`,
      allComp,
      `} as unknown as Record<string, Plugin>`,
      '',
    ].join('\n')
  })
}

export async function declareGlobalComponent(
  kebabCaseName: string,
  pascalCaseName: string,
  mainKebabCaseName?: string,
) {
  await replaceFileContent(path.resolve(libRootDir, 'global.d.ts'), (content) => {
    return (
      `declare module 'vue' {\n  export interface GlobalComponents {\n` +
      [
        ...new Set(
          content
            .split(/[{}]/)[2]
            .trim()
            .split('\n')
            .map((item) => item.trim())
            .concat([
              `S${pascalCaseName}: typeof import('./components/${mainKebabCaseName || kebabCaseName}/${kebabCaseName}.vue').default`,
            ])
            .sort()
            .map((item) => `    ${item}`),
        ),
      ].join('\n') +
      `\n  }\n}\n\nexport {}\n`
    )
  })
}

export async function addDemoRoute(kebabCaseName: string) {
  const routerPath = path.resolve(srcDir, 'router/index.ts')
  const route = `        {
          path: '${kebabCaseName}',
          component: () => import('@/views/components/${kebabCaseName}/index.vue'),
        },`

  console.log(`请手动添加路由, 文件路径: ${routerPath}`)
  console.log(`路由对象: ${route}`)
}

export async function addDemoMenu(
  groupCnName: string,
  kebabCaseName: string,
  pascalCaseName: string,
  cnName: string,
) {
  await replaceFileContent(path.resolve(srcDir, 'components/menu/menu.json'), (content) => {
    const obj = JSON.parse(content) as typeof import('../../src/components/menu/menu.json')
    const group = obj.find((item) => item.title === groupCnName)
    if (!group) {
      consola.warn(`找不到菜单组: ${groupCnName}`)
    } else {
      let children = group.children
      if (!children) {
        children = group.children = []
      }
      if (children.find((item) => item.name === kebabCaseName)) {
        consola.warn(`已存在同名组件: ${kebabCaseName}`)
      } else {
        children.push({
          title: `${pascalCaseName} ${cnName}`,
          name: kebabCaseName,
        })
        children.sort((a, b) => (a.name < b.name ? -1 : 1))
      }
    }
    return JSON.stringify(obj, null, 2) + '\n'
  })
}
