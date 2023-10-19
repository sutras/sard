function isPlainObject(target) {
  return Object.prototype.toString.call(target) === '[object Object]'
}

export function deepMerge(...args) {
  const target = args[0],
    l = args.length
  let i = 1,
    options,
    name,
    src,
    copy,
    copyIsArray,
    clone

  for (; i < l; i++) {
    options = args[i]
    if (options !== null && options !== undefined) {
      for (name in options) {
        src = target[name]
        copy = options[name]

        // 防止有环
        if (target === copy) {
          continue
        }

        // 深复制
        if (isPlainObject(copy) || (copyIsArray = Array.isArray(copy))) {
          if (copyIsArray) {
            copyIsArray = false
            clone = src && Array.isArray(src) ? src : []
          } else {
            clone = src && isPlainObject(src) ? src : {}
          }

          // 只克隆对象，不移动
          target[name] = deepMerge(clone, copy)
        }

        // 不添加未定义的值
        else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }

  return target
}

export default deepMerge
