import React from 'react'

import { ItemsProvider } from './components/ItemsContext'
import DndList from './components/DndList'
import NewItemForm from './components/NewItemForm'

function App (): JSX.Element {
  return (
    <ItemsProvider>
        <h2>TODO App</h2>
        <NewItemForm/>
        <DndList />
    </ItemsProvider>
  )
}

export default App
