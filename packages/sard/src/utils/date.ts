// 获取一个月中的天数
export function getDaysInMonth(year: number, month: number) {
  if (month === 2) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28
  } else {
    return [4, 6, 9, 11].includes(month) ? 30 : 31
  }
}

// 获取一个月中一号对应的星期
export function getWeekOnFirstDay(year: number, month: number) {
  return new Date(year, month - 1, 1).getDay()
}

// 获取 Date 中的总天数
export function getDaysInDate(date: Date) {
  return Math.floor(date.getTime() / 1000 / 60 / 60 / 24)
}
