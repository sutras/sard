import MarkdownIt from 'markdown-it'
import { normalizePath } from 'vite'
import path from 'node:path'
import esbuild from 'esbuild'
import { readFileSync, existsSync } from 'fs'
import { MD_DEMO_CODE_SEPARATOR, MD_PATH_R } from '../utils/constants.js'
import { hlCallback } from '../utils/highlight.js'
import genHash from '../utils/genHash.js'

const renderStrategies = {
  markdown(code) {
    const html = code
      .replace(/[`$]/g, '\\$')
      .replace(/\f/g, '')
      .replace(/(?=<h[23])/g, '\f')
      .split('\f')
      .map((fragment) =>
        fragment.includes('<h3')
          ? `<div class="doc-card">${fragment}</div>`
          : fragment,
      )
      .join('')
      .split(/(?=<table)|(?<=<\/table>)/)
      .map((fragment) =>
        fragment.includes('<table')
          ? `<div class="doc-table-responsive">${fragment}</div>`
          : fragment,
      )
      .join('')
      .split(/(?=<pre)|(?<=<\/pre>)/)
      .map((fragment) =>
        fragment.includes('<pre')
          ? `<div class="doc-code-wrapper">${fragment}</div>`
          : fragment,
      )
      .join('')

    return `<section className="doc-section" dangerouslySetInnerHTML={{ __html: \`${genHash(
      html,
    )}\` }}></section>`
  },

  demo(data) {
    return `<section className="doc-section">${data
      .map((demo) => {
        return `<Demo>{${demo.name}}</Demo>`
      })
      .join('\n')}</section>`
  },
}

function makeTextToCode(text, lang) {
  return text
    .replace(/^\s*|\s*$/g, '')
    .replace(/^/, `\`\`\`${lang}\n`)
    .replace(/$/, '\n```')
}

function getVariables(text) {
  text = /(?<=#variables)[\s\S]*?(?=\/\/\s*#endvariables)/.exec(text)?.[0] || ''
  return makeTextToCode(text, 'scss')
}

function extractCssVariables(id) {
  const file = path.resolve(path.dirname(id), 'index.scss')

  if (existsSync(file)) {
    return getVariables(readFileSync(file, 'utf-8'))
  } else {
    return ''
  }
}

function readSpecialFile(id, relativePath) {
  const file = path.resolve(path.dirname(id), relativePath)

  if (existsSync(file)) {
    const text = readFileSync(file, 'utf-8')
    return makeTextToCode(text, 'scss')
  } else {
    return ''
  }
}

function transform(code, id, md) {
  if (!MD_PATH_R.test(id)) {
    return
  }

  let demoUrls = []

  let demoId = 0

  const html_block = md.renderer.rules.html_block
  md.renderer.rules.html_block = (tokens, idx, options, env, self) => {
    // const token = tokens[idx]
    return html_block(tokens, idx, options, env, self)
  }

  code = code
    .replace(/^%\{variables\}/m, () => {
      return extractCssVariables(id)
    })
    .replace(/^%\(([^)]+)\)/m, (_, p1) => {
      return readSpecialFile(id, p1)
    })

  let html = md.render(code)

  const sections = html
    .split(MD_DEMO_CODE_SEPARATOR)
    .map((fragment, idx, { length }) => {
      const section = {
        type: 'markdown',
        data: fragment,
      }
      if (idx === length - 1) {
        return section
      }
      return [
        section,
        {
          type: 'demo',
          data: demoUrls[idx].map((url) => ({
            url: url,
            fullUrl: normalizePath(
              path.resolve(id, '..', url).replace(/\.\w+$/, ''),
            ),
            name: `Demo${++demoId}`,
            id: demoId,
          })),
        },
      ]
    })
    .flat()

  const content = `import React from 'react'
    import Demo from '@@/components/Demo'
    import useCodeTool from '@@/use/useCodeTool'

    ${sections
      .filter((section) => section.type === 'demo')
      .map((section) => section.data)
      .flat()
      .map(
        (demo) =>
          `import ${demo.name}, { doc as doc${demo.id} } from '${demo.fullUrl}'\n` +
          `${demo.name}.doc = doc${demo.id}`,
      )
      .join('\n')}

    export default function Component() {
      useCodeTool()
      
      return (
        <div className="doc-content">
          ${sections
            .map((section) => {
              return renderStrategies[section.type](section.data)
            })
            .join('\n')}
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
