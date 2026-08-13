import { describe, expect, test, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import Upload from '../upload.vue'
import { chooseFile } from '../../../utils'
import type { UploadFileItem, UploadProps } from '../common'

vi.mock('../../../utils', async () => {
  const actual = await vi.importActual<typeof import('../../../utils')>('../../../utils')
  return {
    ...actual,
    chooseFile: vi.fn<() => void>(),
    // Override to avoid relying on File.type which may not work in happy-dom
    isImageFile: (file: File) =>
      /\.(jpg|jpeg|png|gif|svg|bmp|webp|tiff?|heic|heif)$/i.test(file.name),
    isVideoFile: (file: File) => /\.(mp4|avi|mov|wmv|flv|mkv|webm)$/i.test(file.name),
  }
})

const mockChooseFile = vi.mocked(chooseFile)

function mockFile(name = 'test.jpg', _size = 1024): File {
  // Use Blob to ensure type property is properly set in happy-dom
  const blob = new Blob([''], { type: 'image/jpeg' })
  const file = new File([blob], name)
  return file
}

function mockFileItem(overrides: Partial<UploadFileItem> = {}): UploadFileItem {
  return {
    url: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic1.jpg',
    ...overrides,
  }
}

function resolveChooseFile(files: File[]) {
  mockChooseFile.mockResolvedValueOnce(files)
}

describe('Upload', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // # basic

  test('renders upload component with select button', () => {
    const wrapper = mount(<Upload />)

    expect(wrapper.find('.s-upload').exists()).toBe(true)
    expect(wrapper.find('.s-upload__select').exists()).toBe(true)
  })

  test('selects files and renders previews', async () => {
    const wrapper = mount(<Upload />)
    resolveChooseFile([mockFile('pic1.jpg'), mockFile('pic2.jpg')])

    await wrapper.find('.s-upload__select').trigger('click')
    await nextTick()
    await nextTick()

    expect(wrapper.findAll('.s-upload__preview').length).toBe(2)
  })

  // # modelValue

  test('renders initial modelValue files', () => {
    const wrapper = mount(
      <Upload
        modelValue={[
          mockFileItem({ url: 'https://example.com/a.jpg' }),
          mockFileItem({ url: 'https://example.com/b.jpg' }),
        ]}
      />,
    )

    expect(wrapper.findAll('.s-upload__preview').length).toBe(2)
  })

  test('emits update:modelValue and change when files are selected', async () => {
    const wrapper = mount(<Upload />)
    resolveChooseFile([mockFile('pic1.jpg')])

    await wrapper.find('.s-upload__select').trigger('click')
    await nextTick()
    await nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  // # video

  test('renders video elements for video files', () => {
    const wrapper = mount(
      <Upload
        modelValue={[
          mockFileItem({
            url: 'https://fastly.jsdelivr.net/npm/@sard/assets/video/video1.mp4',
          }),
          mockFileItem({
            url: 'https://fastly.jsdelivr.net/npm/@sard/assets/video/video1.mp4',
          }),
        ]}
      />,
    )

    expect(wrapper.findAll('video').length).toBe(2)
  })

  // # maxCount

  test('hides select button when maxCount is reached', async () => {
    const wrapper = mount(<Upload maxCount={3} />)
    resolveChooseFile([mockFile('a.jpg'), mockFile('b.jpg')])

    await wrapper.find('.s-upload__select').trigger('click')
    await nextTick()
    await nextTick()

    expect(wrapper.findAll('.s-upload__preview').length).toBe(2)
    expect(wrapper.find('.s-upload__select').exists()).toBe(true)

    resolveChooseFile([mockFile('c.jpg')])
    await wrapper.find('.s-upload__select').trigger('click')
    await nextTick()
    await nextTick()

    expect(wrapper.findAll('.s-upload__preview').length).toBe(3)
    expect(wrapper.find('.s-upload__select').exists()).toBe(false)
  })

  test('truncates selected files that exceed maxCount', async () => {
    const wrapper = mount(
      <Upload
        maxCount={2}
        modelValue={[mockFileItem({ url: 'https://example.com/existing.jpg' })]}
      />,
    )
    resolveChooseFile([mockFile('a.jpg'), mockFile('b.jpg'), mockFile('c.jpg')])

    await wrapper.find('.s-upload__select').trigger('click')
    await nextTick()
    await nextTick()

    // 1 existing + only 1 more (maxCount=2, remainCount=1)
    expect(wrapper.findAll('.s-upload__preview').length).toBe(2)
  })

  // # beforeChoose

  test('beforeChoose can prevent file selection', async () => {
    const beforeChoose = vi.fn<NonNullable<UploadProps['beforeChoose']>>((_list, next) => {
      next(false)
    })
    const wrapper = mount(<Upload beforeChoose={beforeChoose} />)

    await wrapper.find('.s-upload__select').trigger('click')

    expect(mockChooseFile).not.toHaveBeenCalled()
    expect(wrapper.findAll('.s-upload__preview').length).toBe(0)
  })

  test('beforeChoose can allow selection with options', async () => {
    const beforeChoose = vi.fn<NonNullable<UploadProps['beforeChoose']>>((_list, next) => {
      next({ capture: 'user' })
    })
    const wrapper = mount(<Upload beforeChoose={beforeChoose} />)
    resolveChooseFile([mockFile('pic1.jpg')])

    await wrapper.find('.s-upload__select').trigger('click')
    await nextTick()
    await nextTick()

    expect(mockChooseFile).toHaveBeenCalledWith(expect.objectContaining({ capture: 'user' }))
    expect(wrapper.findAll('.s-upload__preview').length).toBe(1)
  })

  test('beforeChoose receives current file list', async () => {
    const beforeChoose = vi.fn<NonNullable<UploadProps['beforeChoose']>>((list, next) => {
      expect(list).toHaveLength(1)
      expect(list[0].url).toBe('https://example.com/existing.jpg')
      next(true)
    })
    const wrapper = mount(
      <Upload
        beforeChoose={beforeChoose}
        modelValue={[mockFileItem({ url: 'https://example.com/existing.jpg' })]}
      />,
    )
    resolveChooseFile([mockFile('new.jpg')])

    await wrapper.find('.s-upload__select').trigger('click')
    await nextTick()
    await nextTick()

    expect(beforeChoose).toHaveBeenCalled()
  })

  // # beforeRead

  test('beforeRead can filter out files', async () => {
    const beforeRead = vi.fn<NonNullable<UploadProps['beforeRead']>>((file) => {
      return file.name !== 'pic2.jpg'
    })
    const wrapper = mount(<Upload beforeRead={beforeRead} />)
    resolveChooseFile([mockFile('pic1.jpg'), mockFile('pic2.jpg'), mockFile('pic3.jpg')])

    await wrapper.find('.s-upload__select').trigger('click')
    await nextTick()
    await nextTick()

    expect(wrapper.findAll('.s-upload__preview').length).toBe(2)
  })

  test('beforeRead async can filter out files via rejection', async () => {
    const beforeRead = vi.fn<NonNullable<UploadProps['beforeRead']>>((file) => {
      if (file.name === 'bad.jpg') {
        return Promise.reject()
      }
      return Promise.resolve(file)
    })
    const wrapper = mount(<Upload beforeRead={beforeRead} />)
    resolveChooseFile([mockFile('good.jpg'), mockFile('bad.jpg')])

    await wrapper.find('.s-upload__select').trigger('click')
    await nextTick()
    await nextTick()
    await nextTick()

    expect(wrapper.findAll('.s-upload__preview').length).toBe(1)
  })

  // # maxSize

  test('maxSize filters oversized files and calls overSize', async () => {
    const overSize = vi.fn<NonNullable<UploadProps['overSize']>>()
    const wrapper = mount(<Upload maxSize={500} overSize={overSize} />)

    const largeFile = new File([new ArrayBuffer(1024)], 'large.jpg', { type: 'image/jpeg' })
    const smallFile = new File([new ArrayBuffer(100)], 'small.jpg', { type: 'image/jpeg' })
    resolveChooseFile([largeFile, smallFile])

    await wrapper.find('.s-upload__select').trigger('click')
    await nextTick()
    await nextTick()
    await nextTick()

    expect(wrapper.findAll('.s-upload__preview').length).toBe(1)
    expect(overSize).toHaveBeenCalledTimes(1)
    expect(overSize.mock.calls[0][0]).toHaveLength(1)
  })

  // # afterRead

  test('calls afterRead after files are selected', async () => {
    const afterRead = vi.fn<NonNullable<UploadProps['afterRead']>>()
    const wrapper = mount(<Upload afterRead={afterRead} />)
    resolveChooseFile([mockFile('pic1.jpg')])

    await wrapper.find('.s-upload__select').trigger('click')
    await nextTick()
    await nextTick()
    await nextTick()

    expect(afterRead).toHaveBeenCalledTimes(1)
    expect(afterRead.mock.calls[0][0]).toMatchObject({ name: 'pic1.jpg' })
  })

  // # status

  test('displays uploading status with message and loading icon', () => {
    const wrapper = mount(
      <Upload
        modelValue={[
          mockFileItem({
            url: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic2.jpg',
            status: 'uploading',
            message: '正在上传',
          }),
        ]}
      />,
    )

    const preview = wrapper.find('.s-upload__preview')
    expect(preview.find('.s-upload__status-message').text()).toBe('正在上传')
    expect(preview.find('.s-loading').exists()).toBe(true)
  })

  test('displays failed status with message and status icon', () => {
    const wrapper = mount(
      <Upload
        modelValue={[
          mockFileItem({
            url: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic3.jpg',
            status: 'failed',
            message: '上传失败',
          }),
        ]}
      />,
    )

    const preview = wrapper.find('.s-upload__preview')
    expect(preview.find('.s-upload__status-message').text()).toBe('上传失败')
    expect(preview.find('.s-upload__status').exists()).toBe(true)
  })

  // # readonly

  test('adds readonly class and hides select button', () => {
    const wrapper = mount(<Upload readonly modelValue={[mockFileItem()]} />)

    expect(wrapper.find('.s-upload.is-readonly').exists()).toBe(true)
    expect(wrapper.find('.s-upload__select').exists()).toBe(false)
  })

  // # disabled

  test('adds disabled class and ignores clicks', async () => {
    const wrapper = mount(<Upload disabled modelValue={[mockFileItem()]} />)

    expect(wrapper.find('.s-upload.is-disabled').exists()).toBe(true)

    await wrapper.find('.s-upload__select').trigger('click')

    expect(mockChooseFile).not.toHaveBeenCalled()
    expect(wrapper.findAll('.s-upload__preview').length).toBe(1)
  })

  // # removable

  test('can remove a file by default', async () => {
    const wrapper = mount(
      <Upload
        modelValue={[
          mockFileItem({ url: 'https://example.com/a.jpg' }),
          mockFileItem({ url: 'https://example.com/b.jpg' }),
        ]}
      />,
    )

    await wrapper.find('.s-upload__remove').trigger('click')

    expect(wrapper.findAll('.s-upload__preview').length).toBe(1)
    expect(wrapper.emitted('remove')).toBeTruthy()
    expect(wrapper.emitted('remove')![0]).toEqual([
      0,
      expect.objectContaining({ url: 'https://example.com/a.jpg' }),
    ])
  })

  test('hides remove button when removable is false', () => {
    const wrapper = mount(<Upload removable={false} modelValue={[mockFileItem()]} />)

    expect(wrapper.find('.s-upload__remove').exists()).toBe(false)
  })

  // # beforeRemove

  test('beforeRemove can prevent removal by returning false', async () => {
    const beforeRemove = vi.fn<() => boolean>(() => false)
    const wrapper = mount(
      <Upload
        beforeRemove={beforeRemove}
        modelValue={[mockFileItem({ url: 'https://example.com/a.jpg' })]}
      />,
    )

    await wrapper.find('.s-upload__remove').trigger('click')

    expect(wrapper.findAll('.s-upload__preview').length).toBe(1)
  })

  test('beforeRemove async can allow removal', async () => {
    const beforeRemove = vi.fn<() => Promise<void>>(() => Promise.resolve())
    const wrapper = mount(
      <Upload
        beforeRemove={beforeRemove}
        modelValue={[mockFileItem({ url: 'https://example.com/a.jpg' })]}
      />,
    )

    await wrapper.find('.s-upload__remove').trigger('click')
    await nextTick()
    await nextTick()

    expect(wrapper.findAll('.s-upload__preview').length).toBe(0)
  })

  // # events

  test('emits item-click when clicking a preview item', async () => {
    const wrapper = mount(
      <Upload modelValue={[mockFileItem({ url: 'https://example.com/a.jpg' })]} />,
    )

    await wrapper.find('.s-upload__preview').trigger('click')

    expect(wrapper.emitted('item-click')).toBeTruthy()
    expect(wrapper.emitted('item-click')![0]).toEqual([
      expect.objectContaining({ url: 'https://example.com/a.jpg' }),
      0,
    ])
  })

  test('emits change with updated list after removal', async () => {
    const wrapper = mount(
      <Upload
        modelValue={[
          mockFileItem({ url: 'https://example.com/a.jpg' }),
          mockFileItem({ url: 'https://example.com/b.jpg' }),
        ]}
      />,
    )

    await wrapper.find('.s-upload__remove').trigger('click')

    const changeEvents = wrapper.emitted('change')
    expect(changeEvents).toBeTruthy()
    expect(changeEvents![0][0]).toHaveLength(1)
  })

  // # custom select slot

  test('renders custom select slot content', () => {
    const wrapper = mount(
      <Upload>
        {{
          select: () => <div class="custom-select">自定义选择</div>,
        }}
      </Upload>,
    )

    expect(wrapper.find('.s-upload__select .custom-select').text()).toBe('自定义选择')
  })

  // # default slot

  test('renders default slot with list and action props', () => {
    const wrapper = mount(
      <Upload modelValue={[mockFileItem({ url: 'https://example.com/a.jpg' })]}>
        {{
          default: ({ list, onSelect }: any) => (
            <div class="custom-area">
              <span class="list-count">{list.length}</span>
              <button class="custom-select-btn" onClick={onSelect}>
                选择
              </button>
            </div>
          ),
        }}
      </Upload>,
    )

    expect(wrapper.find('.custom-area').exists()).toBe(true)
    expect(wrapper.find('.list-count').text()).toBe('1')
    expect(wrapper.find('.custom-select-btn').exists()).toBe(true)
  })

  // # mediaType

  test('chooses files with correct accept based on mediaType', async () => {
    const wrapper = mount(<Upload mediaType={['image', 'video']} />)
    resolveChooseFile([mockFile('pic1.jpg')])

    await wrapper.find('.s-upload__select').trigger('click')
    await nextTick()
    await nextTick()

    expect(mockChooseFile).toHaveBeenCalledWith(
      expect.objectContaining({
        accept: ['image/*', 'video/*'],
      }),
    )
  })

  test('video-only mediaType', async () => {
    const wrapper = mount(<Upload mediaType="video" />)
    resolveChooseFile([mockFile('video.mp4')])

    await wrapper.find('.s-upload__select').trigger('click')
    await nextTick()
    await nextTick()

    expect(mockChooseFile).toHaveBeenCalledWith(
      expect.objectContaining({
        accept: ['video/*'],
      }),
    )
  })

  // # watch modelValue

  test('reacts to external modelValue changes', async () => {
    const wrapper = mount(
      <Upload modelValue={[mockFileItem({ url: 'https://example.com/a.jpg' })]} />,
    )

    expect(wrapper.findAll('.s-upload__preview').length).toBe(1)

    await wrapper.setProps({
      modelValue: [
        mockFileItem({ url: 'https://example.com/a.jpg' }),
        mockFileItem({ url: 'https://example.com/b.jpg' }),
      ],
    })

    expect(wrapper.findAll('.s-upload__preview').length).toBe(2)
  })

  // # expose

  test('exposes select method', () => {
    const wrapper = mount(<Upload />)

    expect((wrapper.vm as unknown as { select: unknown }).select).toBeDefined()
    expect(typeof (wrapper.vm as unknown as { select: () => void }).select).toBe('function')
  })

  test('exposed select triggers file selection', async () => {
    const wrapper = mount(<Upload />)
    resolveChooseFile([mockFile('via-expose.jpg')])

    ;(wrapper.vm as unknown as { select: () => void }).select()
    await nextTick()
    await nextTick()
    await nextTick()
    await nextTick()

    expect(mockChooseFile).toHaveBeenCalled()
    expect(wrapper.findAll('.s-upload__preview').length).toBe(1)
  })

  // # multiple

  test('multiple prop passes to chooseFile', async () => {
    const wrapper = mount(<Upload multiple />)
    resolveChooseFile([mockFile('a.jpg'), mockFile('b.jpg')])

    await wrapper.find('.s-upload__select').trigger('click')
    await nextTick()
    await nextTick()

    expect(mockChooseFile).toHaveBeenCalledWith(
      expect.objectContaining({
        multiple: true,
      }),
    )
  })
})
