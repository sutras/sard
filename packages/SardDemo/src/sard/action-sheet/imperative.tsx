import { ActionSheetItemProps, ActionSheetProps } from './ActionSheet'
import { mapIdAgent } from './Agent'

export interface ActionSheetOptions extends ActionSheetProps {
  id?: string
}

export const show = (options: ActionSheetOptions) => {
  const { id = 'actionSheet', onSelect } = options

  return new Promise<{ index: number; item: string | ActionSheetItemProps }>(
    (resolve) => {
      const ref = mapIdAgent[id]

      if (ref) {
        ref.current?.show({
          ...options,
          onSelect(index, item) {
            resolve({ index, item })
            return onSelect?.(index, item)
          },
        })
      }
    },
  )
}

export const hide = (id = 'actionSheet') => {
  mapIdAgent[id]?.current?.hide()
}

export const hideAll = () => {
  Object.keys(mapIdAgent).forEach((key) => mapIdAgent[key]?.current?.hide())
}
