import React, { useState } from 'react'

import DndList from './components/DndList'
import NewItemForm from './components/NewItemForm'
import { Card, createStyles, rem } from '@mantine/core'
import SimpleHeader from './components/SimpleHeader'
import { AppProvider } from './components/AppContext'

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

  const [active, setActive] = useState(links[0].link)

  return (
    <AppProvider>
      <SimpleHeader links={links} active={active} setActive={setActive} />
      <div className={classes.page}>
        <h2>TODO App</h2>
        <Card withBorder radius="md" className={classes.card}>
          <NewItemForm />
          <DndList active={active} />
        </Card>
      </div>
    </AppProvider>
  )
}

export default App
