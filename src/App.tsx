import React from 'react'

import { ItemsProvider } from './components/ItemsContext'
import DndList from './components/DndList'
import NewItemForm from './components/NewItemForm'
import { Card, MantineProvider, createStyles, rem } from '@mantine/core'

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

function App (): JSX.Element {
  const { classes } = useStyles()

  return (
    <MantineProvider
      // theme={{ colorScheme: 'dark' }}
      withGlobalStyles withNormalizeCSS
    >
      <ItemsProvider>
        <div className={classes.page}>
          <h2>TODO App</h2>
          <Card withBorder radius="md" className={classes.card}>
            <NewItemForm/>
            <DndList />
          </Card>
        </div>
      </ItemsProvider>
    </MantineProvider>
  )
}

export default App
