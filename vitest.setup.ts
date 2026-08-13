// Mock ResizeObserver for jsdom
class ResizeObserverMock {
  constructor(callback: ResizeObserverCallback) {
    // Simulate an initial observation
    queueMicrotask(() => {
      callback(
        [
          {
            target: document.body,
            contentBoxSize: [{ inlineSize: 0, blockSize: 0 }],
            contentRect: new DOMRectReadOnly(),
          } as ResizeObserverEntry,
        ],
        this as unknown as ResizeObserver,
      )
    })
  }

  observe() {}
  unobserve() {}
  disconnect() {}
}

;(globalThis as any).ResizeObserver = ResizeObserverMock

// Mock IntersectionObserver for jsdom
class IntersectionObserverMock {
  constructor(_callback: IntersectionObserverCallback) {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
;(globalThis as any).IntersectionObserver = IntersectionObserverMock

// Mock scrollTo for jsdom
if (typeof Element.prototype.scrollTo === 'undefined') {
  Element.prototype.scrollTo = function (options?: ScrollToOptions | number, y?: number) {
    if (typeof options === 'object') {
      if (options.top !== undefined) {
        ;(this as HTMLElement).scrollTop = options.top
      }
      if (options.left !== undefined) {
        ;(this as HTMLElement).scrollLeft = options.left
      }
    } else {
      ;(this as HTMLElement).scrollLeft = options ?? 0
      ;(this as HTMLElement).scrollTop = y ?? 0
    }
  } as any
}

// Mock window.scrollTo for jsdom
window.scrollTo = (() => {}) as any

// Mock HTMLCanvasElement.getContext for jsdom
;(HTMLCanvasElement.prototype as any).toDataURL = function () {
  return 'data:image/png;base64,'
}

HTMLCanvasElement.prototype.getContext = function (
  this,
  contextType: string,
  _contextAttributes?: any,
) {
  if (contextType === '2d') {
    return {
      canvas: this,
      fillStyle: '',
      font: '',
      globalAlpha: 1,
      textAlign: 'start' as CanvasTextAlign,
      textBaseline: 'alphabetic' as CanvasTextBaseline,
      fillRect() {},
      clearRect() {},
      fillText() {},
      strokeText() {},
      measureText(text: string) {
        return { width: text.length * 6 } as TextMetrics
      },
      setTransform() {},
      scale() {},
      translate() {},
      rotate() {},
      save() {},
      restore() {},
      drawImage() {},
      getImageData(x: number, y: number, w: number, h: number) {
        return {
          data: new Uint8ClampedArray(w * h * 4),
          width: w,
          height: h,
          colorSpace: 'srgb' as PredefinedColorSpace,
        } as ImageData
      },
      putImageData() {},
      createImageData(w: number, h: number) {
        return {
          data: new Uint8ClampedArray(w * h * 4),
          width: w,
          height: h,
          colorSpace: 'srgb' as PredefinedColorSpace,
        } as ImageData
      },
      createPattern() {
        return {} as CanvasPattern
      },
      createLinearGradient() {
        return {} as CanvasGradient
      },
      createRadialGradient() {
        return {} as CanvasGradient
      },
      beginPath() {},
      closePath() {},
      moveTo() {},
      lineTo() {},
      arc() {},
      rect() {},
      clip() {},
      stroke() {},
      fill() {},
    } as any
  }
  return null
} as any
