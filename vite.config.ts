import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import tailwindcss from '@tailwindcss/vite'
// import { visualizer } from 'rollup-plugin-visualizer'

import postcssPresetEnv from 'postcss-preset-env'

const browsers = ['chrome >= 87', 'safari >= 14.1']
const browsersRolldown = ['chrome87', 'safari14.1']

// https://vitejs.dev/config/
export default defineConfig({
  base: '/mobile/',
  server: {
    watch: {
      ignored: ['!**/sard/**'],
    },
    host: true,
  },
  optimizeDeps: {
    exclude: ['sard'],
    force: true,
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {},
      },
    }),
    vueJsx(),
    tailwindcss(),
    // visualizer(),
    legacy({
      renderLegacyChunks: false,
      modernPolyfills: true,
      // AbortController, flex gap, inset, css logical
      modernTargets: browsers,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv({
          browsers,
          features: {
            'logical-properties-and-values': false,
            // 'cascade-layers': false,
          },
        }),
      ],
    },
  },
  build: {
    target: browsersRolldown,
    // minify: false,
    rolldownOptions: {
      output: {
        // manualChunks(id) {
        //   if (id.includes('node_modules')) {
        //     return 'node_modules'
        //   }
        //   if (id.includes('packages/sard')) {
        //     return 'sard'
        //   }
        // },
      },
    },
  },
})
