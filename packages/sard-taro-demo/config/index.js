const path = require('path')

function getOutputRoot() {
  const platform = process.env.TARO_ENV

  if (platform === 'h5') {
    return path.resolve(process.cwd(), '../sard-taro-docs/docs/mobile')
  }
  return `dist/${platform}`
}

const config = {
  projectName: 'sard-taro',
  date: '2023-6-27',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: getOutputRoot(),
  plugins: [],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'react',
  compiler: 'webpack5',
  cache: {
    enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/static': path.resolve(__dirname, '..', 'src/static'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
  },
  mini: {
    baseLevel: 18,
    postcss: {
      pxtransform: {
        enable: false,
        config: {
          selectorBlackList: ['sar'],
        },
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  h5: {
    publicPath: '/sard-taro/mobile',
    staticDirectory: 'static',
    postcss: {
      pxtransform: {
        enable: false,
        config: {
          selectorBlackList: ['sar'],
        },
      },
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  rn: {
    appName: 'taroDemo',
    postcss: {
      pxtransform: {
        enable: false,
        config: {
          selectorBlackList: ['sar-'],
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
      },
    },
  },
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
