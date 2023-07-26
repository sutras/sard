import child_process from 'child_process'
import { resolve } from 'path'

export function forkChildProcess() {
  return child_process.fork('ganged/dev.js', {
    cwd: resolve(process.cwd(), '../sard-taro-demo'),
  })
}
