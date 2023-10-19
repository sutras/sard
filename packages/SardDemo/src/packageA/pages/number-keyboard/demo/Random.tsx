import { NumberKeyboard, Toast } from 'sard'

export default () => {
  return (
    <NumberKeyboard
      random
      onInput={Toast.show}
      onDelete={() => Toast.show('Delete')}
    />
  )
}
