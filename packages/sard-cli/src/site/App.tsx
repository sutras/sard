import useHash from './use/useHash'
import { useChannel } from './use/useChannel'
import { SuspenseRouter } from './SuspenseRouter'
import ThemeProvider from './ThemeProvider'

function App() {
  const channel = useChannel()

  useHash(`.doc-anchor, .doc-catalog-link`, (id) => {
    channel.emit('scrollTo', id)
  })

  return (
    <ThemeProvider>
      <SuspenseRouter />
    </ThemeProvider>
  )
}

export default App
