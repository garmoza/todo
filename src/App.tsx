import React from 'react'

import { ItemsProvider } from './components/ItemsContext'
import DndList from './components/DndList'
import NewItemForm from './components/NewItemForm'
import { Card, MantineProvider, createStyles, rem } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  page: {
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
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
        <h2>TODO App</h2>
        <div className={classes.page}>
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
