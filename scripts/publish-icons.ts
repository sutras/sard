import { iconOutDir } from './config'
import { publish } from './publish'

async function publishIcons() {
  await publish(iconOutDir)
}

publishIcons()
