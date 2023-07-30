import { useContext, useMemo } from 'react'
import { ConfigProviderContext } from '../config-provider'

type IsType = boolean | number | string | null

const defaultBem = {
  namespace: 'sar',
  blockSeparator: '-',
  elementSeparator: '__',
  modifierSeparator: '_',
}

export function useBem(block: string | number) {
  const { bem: contextBem } = useContext(ConfigProviderContext)

  const bem = useMemo(() => {
    const { namespace, blockSeparator, elementSeparator, modifierSeparator } =
      Object.assign({}, defaultBem, contextBem)

    const prefix = namespace + blockSeparator + block

    return {
      b() {
        return prefix
      },
      e(element: string | number, is?: IsType) {
        if (arguments.length === 2 && !is) {
          return ''
        }
        return prefix + elementSeparator + element
      },
      m(modifier: string | number, is?: IsType) {
        if (arguments.length === 2 && !is) {
          return ''
        }
        return prefix + modifierSeparator + modifier
      },
      em(element: string | number, modifier: string | number, is?: IsType) {
        if (arguments.length === 3 && !is) {
          return ''
        }
        return (
          prefix + elementSeparator + element + modifierSeparator + modifier
        )
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
    }
  }, [contextBem])

  return [bem] as const
}

export default useBem
