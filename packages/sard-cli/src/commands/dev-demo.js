import child_process from 'child_process'
import { resolve } from 'node:path'

export function forkChildProcess() {
  return child_process.fork('ganged/dev', {
    cwd: resolve(process.cwd(), '../SardDemo'),
  })
}
