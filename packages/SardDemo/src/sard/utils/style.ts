import { isRN } from './is'

export function getShadow(size: 'small' | 'medium' | 'large' = 'medium') {
  if (isRN) {
    switch (size) {
      case 'small':
        return {
          shadowColor: 'black',
          shadowOpacity: 0.4,
          shadowOffset: { width: 0, height: 1 },
          shadowRadius: 1,
          elevation: 2,
        }
      case 'medium':
        return {
          shadowColor: 'black',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 6,
          elevation: 6,
        }
      case 'large':
        return {
          shadowColor: 'black',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 15,
          elevation: 15,
        }
    }
  } else {
    return null
  }
}
