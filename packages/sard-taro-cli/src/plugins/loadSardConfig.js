import { sardConfig, VIRTUAL_SARD_CONFIG } from '../utils/constants.js'

const resolvedModuleId = '\0' + VIRTUAL_SARD_CONFIG

export function loadSardConfig() {
  return {
    name: 'loadSardConfig',
    enforce: 'pre',
    resolveId(id) {
      if (id === VIRTUAL_SARD_CONFIG) {
        return resolvedModuleId
      }
    },
    load(id) {
      if (id === resolvedModuleId) {
        return 'export default ' + JSON.stringify(sardConfig)
      }
    },
  }
}
