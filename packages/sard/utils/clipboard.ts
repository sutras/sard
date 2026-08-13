async function write(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      legacyWrite(text)
    }
  } else {
    legacyWrite(text)
  }
}

async function read() {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      return await navigator.clipboard.readText()
    } catch {
      return legacyRead()
    }
  } else {
    return legacyRead()
  }
}

function legacyWrite(value: string) {
  const ta = document.createElement('textarea')
  ta.value = value
  ta.style.position = 'absolute'
  ta.style.opacity = '0'
  ta.setAttribute('readonly', '')
  document.body.appendChild(ta)
  ta.select()
  document.execCommand('copy')
  ta.remove()
}

function legacyRead() {
  return document?.getSelection?.()?.toString() ?? ''
}

export const clipboard = {
  write,
  read,
}
