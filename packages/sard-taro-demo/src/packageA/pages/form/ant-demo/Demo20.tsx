import { useState } from 'react'
import { Form, Stepper, ValidateStatus } from 'sard-taro'

const validatePrimeNumber = (
  number: number,
): {
  validateStatus: ValidateStatus
  errorMsg: string | null
} => {
  if (number === 11) {
    return {
      validateStatus: 'passed',
      errorMsg: null,
    }
  }
  return {
    validateStatus: 'failed',
    errorMsg: 'The prime between 8 and 12 is 11!',
  }
}

const tips =
  'A prime is a natural number greater than 1 that has no positive divisors other than 1 and itself.'

function App() {
  const [number, setNumber] = useState<{
    value: number
    validateStatus?: ValidateStatus
    errorMsg?: string | null
  }>({ value: 11 })

  const onNumberChange = (value: number) => {
    setNumber({
      ...validatePrimeNumber(value),
      value,
    })
  }

  return (
    <Form>
      <Form.Field
        labelWidth={100}
        label="Prime between 8 & 12"
        validateStatus={number.validateStatus}
        feedback={number.errorMsg || tips}
      >
        <Stepper
          min={8}
          max={12}
          value={number.value}
          onChange={onNumberChange}
        />
      </Form.Field>
    </Form>
  )
}

App.title = '自行处理表单数据'

export default App
