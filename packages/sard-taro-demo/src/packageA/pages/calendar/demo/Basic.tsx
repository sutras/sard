import { Calendar, Toast } from 'sard-taro'

export default () => {
  const handleChange = (date: Date) => {
    Toast.show(date.toLocaleDateString())
  }

  return <Calendar onChange={handleChange} />
}
