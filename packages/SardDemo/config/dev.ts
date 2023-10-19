import type { UserConfigExport } from '@tarojs/cli'

export default {
  logger: {
    quiet: false,
    stats: true,
  },
  mini: {},
  h5: {
    devServer: {
      port: 10086,
      host: '0.0.0.0',
      open: false,
    },
  },
} satisfies UserConfigExport
