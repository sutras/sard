import { Form, Input } from 'sard'

function App() {
  return (
    <Form>
      <Form.Field
        label="Unvalidated"
        validateStatus="unvalidated"
        feedback="Unvalidated feedback content"
      >
        <Input inlaid placeholder="Unvalidated" />
      </Form.Field>

      <Form.Field
        label="Passed"
        validateStatus="passed"
        feedback="Passed feedback content"
      >
        <Input inlaid placeholder="Passed" />
      </Form.Field>

      <Form.Field
        label="Failed"
        validateStatus="failed"
        feedback="Failed feedback content"
      >
        <Input inlaid placeholder="Failed" />
      </Form.Field>
    </Form>
  )
}

App.title = '自定义校验'

export default App
