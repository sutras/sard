<template>
  <div :class="uploadPreviewClass" @click="onClick">
    <img
      v-if="isImage"
      :class="bem.e('image')"
      mode="aspectFill"
      :src="mediaUrl"
      @click="onImageClick"
    />
    <div v-else-if="isVideo" :class="bem.e('video-wrapper')">
      <video
        ref="video"
        :class="bem.e('video')"
        :src="mediaUrl"
        :controls="controlsVisible"
        @fullscreenchange="onFullscreenchange"
      ></video>

      <div :class="bem.e('video-play')" @click="onPlayClick">
        <Play />
      </div>
    </div>
    <div v-else :class="bem.e('file')">
      <div :class="bem.e('file-icon')">
        <File />
      </div>
      <div :class="bem.e('file-name')">
        {{ name }}
      </div>
    </div>
    <div v-if="status === 'uploading' || status === 'failed'" :class="bem.e('status')">
      <div :class="bem.e('status-icon')">
        <Loading v-if="status === 'uploading'" />
        <XCircle v-else-if="status === 'failed'" />
      </div>

      <div v-if="message" :class="bem.e('status-message')">{{ message }}</div>
    </div>
    <div
      v-if="removable && !disabled && !readonly && status !== 'uploading'"
      :class="bem.e('remove')"
      @click.stop="onRemove"
    >
      <div :class="bem.e('close')">
        <Close />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import { createBem, isImageFile, isImageUrl, isVideoFile, isVideoUrl } from '../../utils'
import Loading from '../loading/loading.vue'
import {
  type UploadPreviewProps,
  type UploadPreviewEmits,
  defaultUploadPreviewProps,
} from './common'
import { Close, File, Play, XCircle } from '@sard/icons'

const props = withDefaults(defineProps<UploadPreviewProps>(), defaultUploadPreviewProps)

const emit = defineEmits<UploadPreviewEmits>()

const bem = createBem('upload')

const isImage = computed(() => {
  return (
    props.isImage ||
    (props.file ? isImageFile(props.file) : props.url ? isImageUrl(props.url) : false)
  )
})

const isVideo = computed(() => {
  return (
    props.isVideo ||
    (props.file ? isVideoFile(props.file) : props.url ? isVideoUrl(props.url) : false)
  )
})

const mediaUrl = computed(() => {
  if (props.url) return props.url
  if (props.file) return URL.createObjectURL(props.file)
  return ''
})

// ============================ image ============================
const onImageClick = () => {
  emit('image-click')
}

// ============================ video ============================
const controlsVisible = ref(false)
const videoRef = useTemplateRef('video')

const onFullscreenchange = () => {
  const video = videoRef.value

  if (video) {
    if (document.fullscreenElement === video) {
      video.play()
      controlsVisible.value = true
    } else {
      video.pause()
      controlsVisible.value = false
    }
  }
}

const previewVideo = () => {
  videoRef.value?.requestFullscreen()
}

const onPlayClick = () => {
  previewVideo()
}

// ============================ remove ============================
const onRemove = () => {
  if (!props.removable || props.disabled || props.readonly) return
  emit('remove')
}

const onClick = () => {
  emit('click')
}

const uploadPreviewClass = computed(() => {
  return [bem.e('preview'), bem.em('preview', 'is-video', isVideo.value)]
})
</script>
