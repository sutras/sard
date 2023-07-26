import { useMemo } from 'react'
import { uniqid } from '../utils'

export function useSelectorId(perfix?: string) {
  return useMemo(() => uniqid(perfix), [])
}

export default useSelectorId
