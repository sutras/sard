export * from './createStrike'
export * from './createGestures'
export * from './createFingers'
export * from './createChopsticks'
export * from './createInput'
export * from './defaultConfig'

/* 问题
===============================
[x] 阻止浏览器默认行为
[x] 仅阻止水平或垂直方向页面滚动
[ ] 仅允许的方向可以触发事件
[x] 事件类型、target、坐标、速度等信息的传递
[ ] Chopsticks类型
*/

/* 用法
===============================
```
const strike = createStrike(document, {
  tap: true
})
strike.on('tap', (event) => {
  console.log(event)
})
strike.on('swiper', (event) => {
  console.log(event.type)
})


strike.off('tap', fn)
strike.off('tap')
strike.once('tap', fn)
strike.emit('tap', payload)

*/
