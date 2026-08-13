export * from './windowInfo'

type NativeType = null | number | string | boolean | symbol | ((...args: any[]) => any)

type InferDefault<P, T> = ((props: P) => T & {}) | (T extends NativeType ? T : never)

type InferDefaults<T> = {
  [K in keyof T]?: InferDefault<T, T[K]>
}

type LooseRequired<T> = {
  [P in keyof (T & Required<T>)]: T[P]
}

export type DefaultProps<T> = InferDefaults<LooseRequired<T>>
