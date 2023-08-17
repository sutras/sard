import { FC, useState } from 'react'
import {
  Button,
  Col,
  Form,
  Picker,
  PopoutInput,
  Row,
  Stepper,
  Toast,
} from 'sard-taro'

type Currency = 'rmb' | 'dollar'

interface PriceValue {
  number?: number
  currency?: Currency
}

interface PriceInputProps {
  value?: PriceValue
  onChange?: (value: PriceValue) => void
}

const PriceInput: FC<PriceInputProps> = ({ value = {}, onChange }) => {
  const [number, setNumber] = useState(0)
  const [currency, setCurrency] = useState<Currency>('rmb')

  const triggerChange = (changedValue: PriceValue) => {
    onChange?.({ number, currency, ...value, ...changedValue })
  }

  const onNumberChange = (n) => {
    const newNumber = parseInt(n || '0', 10)
    if (Number.isNaN(number)) {
      return
    }
    if (!('number' in value)) {
      setNumber(newNumber)
    }
    triggerChange({ number: newNumber })
  }

  const onCurrencyChange = (newCurrency: Currency) => {
    if (!('currency' in value)) {
      setCurrency(newCurrency)
    }
    triggerChange({ currency: newCurrency })
  }

  return (
    <Row gap={10} align="center">
      <Col>
        <Stepper
          value={String(value.number || number)}
          onChange={onNumberChange}
        ></Stepper>
      </Col>

      <Col>
        <PopoutInput
          inputProps={{ placeholder: '请选择' }}
          value={[value.currency || currency]}
          onChange={onCurrencyChange}
        >
          <Picker
            columns={[
              {
                label: 'RMB',
                value: 'rmb',
              },
              {
                label: 'Dollar',
                value: 'dollar',
              },
            ]}
          />
        </PopoutInput>
      </Col>
    </Row>
  )
}

function App() {
  const handleSuccess = (values) => {
    Toast.show('success')
    console.log('Success:', values)
  }

  const handleFail = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const [form] = Form.useForm()

  return (
    <Form
      form={form}
      onSuccess={handleSuccess}
      onFail={handleFail}
      initialValues={{
        price: {
          number: 0,
          currency: 'rmb',
        },
      }}
      labelWidth={40}
      labelValign="center"
    >
      <Form.Field
        name="price"
        label="Price"
        rules={[
          {
            validator: (value: { number: number }) => {
              if (value.number > 0) {
                return Promise.resolve()
              }
              return Promise.reject('Price must be greater than zero!')
            },
          },
        ]}
      >
        <PriceInput />
      </Form.Field>

      <Form.Field underline={false}>
        <Button block formType="submit">
          Submit
        </Button>
      </Form.Field>
    </Form>
  )
}

App.title = '自定义表单控件'

export default App
