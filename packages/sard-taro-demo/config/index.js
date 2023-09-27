const path = require('path')

function getOutputRoot() {
  const platform = process.env.TARO_ENV

  if (platform === 'h5') {
    return path.resolve(process.cwd(), '../sard-taro/site/mobile')
  }
  return `dist/${platform}`
}

const nativeShellPath = path.resolve(process.cwd(), '../taro-native-shell/')

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
    // 'sard-taro/dist': 'sard-taro/src',
    // 'sard-taro': 'sard-taro/src',
    'sard-taro/dist': path.resolve(__dirname, '..', 'src/sard-taro'),
    'sard-taro': path.resolve(__dirname, '..', 'src/sard-taro'),
  },
  mini: {
    baseLevel: 16,
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
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
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
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
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
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
      },
    },
    output: {
      iosSourceMapUrl: '', // sourcemap 文件url
      iosSourcemapOutput: path.resolve(nativeShellPath, 'ios/main.map'), // sourcemap 文件输出路径
      iosSourcemapSourcesRoot: '', // 将 sourcemap 资源路径转为相对路径时的根目录
      androidSourceMapUrl: '',
      androidSourcemapOutput: path.resolve(
        nativeShellPath,
        'android/app/src/main/assets/index.android.map',
      ),
      androidSourcemapSourcesRoot: '',
      ios: path.resolve(nativeShellPath, 'ios/main.jsbundle'),
      iosAssetsDest: path.resolve(nativeShellPath, 'ios'),
      android: path.resolve(
        nativeShellPath,
        'android/app/src/main/assets/index.android.bundle',
      ),
      androidAssetsDest: path.resolve(
        nativeShellPath,
        'android/app/src/main/res',
      ),
    },
  },
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
