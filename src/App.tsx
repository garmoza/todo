import React, { useState } from 'react'

import { useLocalStorageState } from './hooks/semiPersistent'

import type { TodoItem } from './types'
import { ItemsProvider, useItems, useItemsReducer } from './components/ItemsContext'

function App (): JSX.Element {
  return (
    <ItemsProvider>
        <h2>TODO App</h2>
        <NewItemForm/>
        <List />
    </ItemsProvider>
  )
}

const NewItemForm: React.FC = () => {
  const [items, itemsDispatch] = useItemsReducer()

  const [newItem, setNewItem] = useLocalStorageState('newItem', '')

  function handleSubmit (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()

    const lastItem = items.reduce(
      (previousItem, currentItem) => previousItem.id > currentItem.id ? previousItem : currentItem
    )
    itemsDispatch({
      type: 'ITEM_ADD',
      payload: {
        id: lastItem.id + 1,
        title: newItem,
        completed: false
      }
    })
    setNewItem('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={newItem}
        onChange={(event) => { setNewItem(event.target.value) }}
      />
      <button type='submit'>
        Add
      </button>
    </form>
  )
}

const List: React.FC = () => {
  const items = useItems()

  return (
    <>
      {items.map(item => (
        <Item key={item.id} {...item} />
      ))}
    </>
  )
}

const Item: React.FC<TodoItem> = ({ id, title, completed }) => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div>
      <h3>{title}</h3>
      <button onClick={() => { setIsEditing(!isEditing) }} >
        {isEditing ? 'Save' : 'Edit'}
      </button>
      {completed
        ? (
        <p>Completed</p>
          )
        : (
        <p>Active</p>
          )}
    </div>
  )
}

export default App
