/**
 * 以 hook 的方式组织 LoadMore 的逻辑
 */

import {
  computed,
  type ComputedRef,
  type MaybeRefOrGetter,
  type Ref,
  ref,
  toValue,
  watch,
} from 'vue'
import { useIntersectionObserver } from '../../use'
import type { LoadMoreStatus } from './common'

export interface UseLoadMoreOptions {
  request: (page: number, isRefresh: boolean) => Promise<boolean>
  rootMargin?: MaybeRefOrGetter<string>
  root?: MaybeRefOrGetter<Element | Document | Window | null | undefined>
  target?: MaybeRefOrGetter<Element | null>
  disabled?: MaybeRefOrGetter<boolean>
}

export interface UseLoadMoreReturn {
  status: Ref<LoadMoreStatus>
  isLoading: ComputedRef<boolean>
  isRefreshing: ComputedRef<boolean>
  onLoadMore: () => void
  onReload: () => void
  currentPage: Ref<number, number>
  refresh: (force?: boolean) => Promise<void | null>
}

export function useLoadMore(options: UseLoadMoreOptions): UseLoadMoreReturn {
  const status = ref<LoadMoreStatus>('incomplete')
  const currentPage = ref(1)
  const isRefreshing = ref(false)

  const disabled = computed(() => toValue(options.disabled))

  const { rootMargin = '0px 0px 100px', root, target } = options

  let firstTime = false

  let currentPromise: Promise<void> | null = null

  const loadMoreFetch = async (page: number) => {
    if (status.value === 'loading') return currentPromise

    firstTime = true

    status.value = 'loading'

    currentPage.value = page

    return (currentPromise = options
      .request(page, isRefreshing.value)
      .then((loaded) => {
        isRefreshing.value = false
        status.value = loaded ? 'complete' : 'incomplete'

        if (!loaded) {
          // NOTE: 确保渲染完，以便准确判断是否相交
          setTimeout(() => {
            if (status.value === 'incomplete' && isIntersecting.value) {
              onLoadMore()
            }
          }, 30)
        }
      })
      .catch(() => {
        isRefreshing.value = false
        status.value = 'error'
      }))
  }

  const refresh = async (force?: boolean) => {
    if (!disabled.value) {
      if (force || status.value !== 'loading') {
        isRefreshing.value = true
        return loadMoreFetch(1)
      }
    }
  }

  const onLoadMore = () => {
    if (!disabled.value) {
      loadMoreFetch(currentPage.value + 1)
    }
  }

  const onReload = () => {
    if (!disabled.value) {
      loadMoreFetch(currentPage.value)
    }
  }

  const { isIntersecting } = useIntersectionObserver({
    root,
    rootMargin,
    threshold: 0,
    target,
  })

  watch([disabled, status, isIntersecting], () => {
    // NOTE: 确保渲染完，以便准确判断是否相交
    setTimeout(() => {
      if (!disabled.value && status.value === 'incomplete' && isIntersecting.value) {
        loadMoreFetch(firstTime ? currentPage.value + 1 : currentPage.value)
      }
    }, 30)
  })

  return {
    status,
    isLoading: computed(() => status.value === 'loading'),
    isRefreshing: computed(() => isRefreshing.value),
    onLoadMore,
    onReload,
    currentPage,
    refresh,
  }
}
