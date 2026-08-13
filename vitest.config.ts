import { mergeConfig, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ['./packages/sard/**/*.test.*'],
      setupFiles: ['./vitest.setup.ts'],
      typecheck: {
        enabled: true,
        checker: 'vue-tsc',
        tsconfig: './tsconfig.vitest.json',
        include: ['./packages/sard/**/*.test.*'],
      },
      environment: 'jsdom',
      environmentOptions: {
        happyDOM: {
          width: 375,
          height: 667,
          settings: {
            navigator: {
              userAgent:
                'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/127.0.0.0',
            },
          },
        },
      },
      server: {
        deps: {
          inline: ['vitest-canvas-mock'],
        },
      },
    },
  }),
)
