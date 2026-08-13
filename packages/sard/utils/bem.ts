export interface BemConfig {
  namespace: string
  blockSeparator: string
  elementSeparator: string
  modifierSeparator: string
  statePrefix: string
  actionPrefix: string
}

export const defaultBemConfig = {
  namespace: 's',
  blockSeparator: '-',
  elementSeparator: '__',
  modifierSeparator: '--',
  statePrefix: 'is-',
  actionPrefix: 'has-',
}

export function cssVar(name: string) {
  return `var(--${defaultBemConfig.namespace}-${name})`
}

export function cssVarName(name: string) {
  return `--${defaultBemConfig.namespace}-${name}`
}

type IsType = boolean | number | string | null | undefined | object

export function createBemStruct(config: BemConfig) {
  const {
    namespace,
    blockSeparator,
    elementSeparator,
    modifierSeparator,
    statePrefix,
    actionPrefix,
  } = config

  return (block: string | number) => {
    const prefix = namespace + blockSeparator + block

    return {
      b() {
        return prefix
      },
      e(element: string | number | undefined | null, is?: IsType) {
        if (arguments.length === 2 && !is) {
          return ''
        }
        return prefix + elementSeparator + element
      },
      m(modifier: string | number | undefined | null, is?: IsType) {
        if (arguments.length === 2 && !is) {
          return ''
        }
        return prefix + modifierSeparator + modifier
      },
      em(element: string | number, modifier: string | number | undefined | null, is?: IsType) {
        if (arguments.length === 3 && !is) {
          return ''
        }
        return prefix + elementSeparator + element + modifierSeparator + modifier
      },
      bem(
        block: string | number,
        element?: string | number,
        modifier?: string | number,
        is?: boolean | number | string | null,
      ) {
        if (arguments.length === 4 && !is) {
          return ''
        }

        let className = namespace + blockSeparator + block
        if (element) {
          className += elementSeparator + element
        }
        if (modifier) {
          className += modifierSeparator + modifier
        }
        return className
      },
      is(state: string | number, is?: IsType) {
        if (arguments.length === 2 && !is) {
          return ''
        }
        return statePrefix + state
      },
      has(action: string | number, is?: IsType) {
        if (arguments.length === 2 && !is) {
          return ''
        }
        return actionPrefix + action
      },
    }
  }
}

export const createBem = createBemStruct(defaultBemConfig)

export type Bem = ReturnType<typeof createBem>
