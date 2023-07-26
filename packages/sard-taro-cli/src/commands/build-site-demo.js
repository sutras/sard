import child_process from 'child_process'
import { resolve } from 'path'

export const uniProcess = child_process.fork('ganged/build-site.js', {
  cwd: resolve(process.cwd(), '../sard-taro-demo'),
})
