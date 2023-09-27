import { useState } from 'react'
import { Button, CountDown, Input, Toast } from 'sard-taro'

export default () => {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const sendCaptcha = () => {
    return new Promise((resolve) => setTimeout(resolve, 1000))
  }

  const handleClick = () => {
    setLoading(true)
    sendCaptcha()
      .then(() => {
        Toast.show('已发送验证码')
        setDisabled(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Input
      placeholder="请输入验证码"
      append={
        <Button
          size="small"
          loading={loading}
          disabled={disabled}
          onClick={handleClick}
          style={{ minWidth: 90 }}
        >
          {disabled ? (
            <CountDown
              time={1000 * 8}
              format="重发验证码(s)"
              onFinish={() => setDisabled(false)}
            />
          ) : loading ? (
            '正在发送'
          ) : (
            '发送验证码'
          )}
        </Button>
      }
    />
  )
}
