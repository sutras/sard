import path from 'path'
import { defineConfig, type UserConfigExport } from '@tarojs/cli'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import devConfig from './dev'
import prodConfig from './prod'

function getOutputRoot() {
  const platform = process.env.TARO_ENV

  if (platform === 'h5') {
    return path.resolve(process.cwd(), '../sard/dist-site/mobile')
  }
  return `dist/${platform}`
}

// const nativeShellPath = path.resolve(process.cwd(), '../taro-native-shell/')
const nativeShellPath = path.resolve(process.cwd(), '.')

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig(async (merge) => {
  const baseConfig: UserConfigExport = {
    projectName: 'sard',
    date: '2023-10-9',
    designWidth: 750,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
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
    compiler: {
      type: 'webpack5',
      prebundle: {
        enable: false,
        exclude: ['sard/'],
      },
    },
    cache: {
      enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    alias: {
      '@/components': path.resolve(__dirname, '..', 'src/components'),
      '@/static': path.resolve(__dirname, '..', 'src/static'),
      '@/utils': path.resolve(__dirname, '..', 'src/utils'),
      '@/base.scss': path.resolve(__dirname, '..', 'src/base.scss'),
      'sard/dist': path.resolve(__dirname, '..', 'src/sard'),
      sard: path.resolve(__dirname, '..', 'src/sard'),
    },
    mini: {
      postcss: {
        pxtransform: {
          enable: false,
          config: {
            selectorBlackList: ['.sar-', '.demo-'],
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
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)
        chain.resolve.plugin('MultiPlatformPlugin').tap((args) => {
          args[2]['include'] = ['sard/']
          return args
        })
      },
    },
    h5: {
      publicPath: '/sard/mobile',
      staticDirectory: 'static',
      postcss: {
        pxtransform: {
          enable: false,
          config: {
            selectorBlackList: ['.sar-', '.demo-'],
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
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)
        chain.resolve.plugin('MultiPlatformPlugin').tap((args) => {
          args[2]['include'] = ['sard/']
          return args
        })
      },
    },
    rn: {
      appName: 'SardDemo',
      postcss: {
        pxtransform: {
          enable: false,
          config: {
            selectorBlackList: ['.sar-', '.demo-'],
          },
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        },
        options: {},
      },
      sass: {},
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
      resolve: {
        include: ['sard'],
      },
    },
  }

  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})
