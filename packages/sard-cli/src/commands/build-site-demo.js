import child_process from 'child_process'
import { resolve } from 'node:path'

export const uniProcess = child_process.fork('ganged/build-site.js', {
  cwd: resolve(process.cwd(), '../SardDemo'),
})
