import { libOutDir } from './config'
import { publish } from './publish'

async function publishSard() {
  await publish(libOutDir)
}

publishSard()
