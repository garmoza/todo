import React, { useState } from 'react'

import { ItemsProvider } from './components/ItemsContext'
import DndList from './components/DndList'
import NewItemForm from './components/NewItemForm'
import { Card, ColorSchemeProvider, MantineProvider, createStyles, rem } from '@mantine/core'
import SimpleHeader from './components/SimpleHeader'
import type { ColorScheme } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  card: {
    minWidth: rem(700)
  }
}))

const links = [
  {
    link: 'all',
    label: 'All'
  },
  {
    link: 'active',
    label: 'Active'
  },
  {
    link: 'completed',
    label: 'Completed'
  }
]

function App (): JSX.Element {
  const { classes } = useStyles()

  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const toggleColorScheme = (value?: ColorScheme): void => {
    setColorScheme(value ?? (colorScheme === 'dark' ? 'light' : 'dark'))
  }

  const [active, setActive] = useState(links[0].link)

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <ItemsProvider>
          <SimpleHeader links={links} active={active} setActive={setActive} />
          <div className={classes.page}>
            <h2>TODO App</h2>
            <Card withBorder radius="md" className={classes.card}>
              <NewItemForm />
              <DndList active={active} />
            </Card>
          </div>
        </ItemsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
