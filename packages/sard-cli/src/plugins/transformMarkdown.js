import MarkdownIt from 'markdown-it'
import esbuild from 'esbuild'
import { MD_PATH_R } from '../utils/constants.js'
import { hlCallback } from '../utils/highlight.js'
import genHash from '../utils/genHash.js'
import { compileAtRule } from './md-at-rules/index.js'

const renderStrategies = {
  markdown(code) {
    const html = code
      // 转义模板字符串
      .replace(/([`])/g, '\\$1')

      // 转义大括号
      .replace(/([{}])/g, (m) => {
        return `&#${m.charCodeAt(0)};`
      })

      // 包裹h3
      .replace(/\f/g, '')
      .replace(/(?=<h[23])/g, '\f')
      .split('\f')
      .map((fragment) =>
        fragment.includes('<h3')
          ? `<div class="doc-card">${fragment}</div>`
          : fragment,
      )
      .join('')

      // 包裹表格
      .split(/(?=<table)|(?<=<\/table>)/)
      .map((fragment) =>
        fragment.includes('<table')
          ? `<div class="doc-table-responsive">${fragment}</div>`
          : fragment,
      )
      .join('')

      // 包裹高亮代码
      .split(/(?=<pre)|(?<=<\/pre>)/)
      .map((fragment) =>
        fragment.includes('<pre')
          ? `<div class="doc-code-wrapper">${fragment}</div>`
          : fragment,
      )
      .join('')

    return genHash(html)
  },
}

function transform(code, id, md) {
  if (!MD_PATH_R.test(id)) {
    return
  }

  code = compileAtRule(id, code)

  const html = md.render(code)

  const content = `import React from 'react'
    import useCodeTool from "@@/components/code-tool/useCodeTool"
    export default function Component() {
      useCodeTool()
      
      return (
        <div className="doc-content" dangerouslySetInnerHTML={{__html: \`${renderStrategies.markdown(
          html,
        )}\` }}>
        </div>
      )
    }`
  const result = esbuild.transformSync(content, { loader: 'jsx' })

  return result.code
}

export function transformMarkdown() {
  const md = new MarkdownIt({
    html: true,
    highlight: hlCallback,
  })

  return {
    name: 'transformMarkdown',
    enforce: 'pre',
    transform(code, id) {
      return transform(code, id, md)
    },
  }
}
