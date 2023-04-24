import React, { useState } from 'react'

import { initialItems } from './scripts/data'
import { useLocalStorageState, useLocalStorageReducer } from './semiPersistent'

interface TodoItem {
  id: number
  title: string
  completed: boolean
}

interface ListProps {
  items: TodoItem[]
}

interface ItemAddAction {
  type: 'ITEM_ADD'
  payload: TodoItem
}

interface ItemRemoveAction {
  type: 'ITEM_REMOVE'
}

type ItemsAction =
  | ItemAddAction
  | ItemRemoveAction

const itemsReducer = (
  state: TodoItem[],
  action: ItemsAction
): TodoItem[] => {
  switch (action.type) {
    case 'ITEM_ADD':
      return [
        { ...action.payload },
        ...state
      ]
    case 'ITEM_REMOVE':
      return [
        ...state
      ]
    default:
      throw new Error()
  }
}

function App (): JSX.Element {
  const [items, dispatchItems] = useLocalStorageReducer('todos', itemsReducer, initialItems)
  const [newItem, setNewItem] = useLocalStorageState('newItem', '')

  function handleSubmit (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()

    const lastItem = items.reduce(
      (previousItem, currentItem) => previousItem.id > currentItem.id ? previousItem : currentItem
    )
    dispatchItems({
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
    <div className='App'>
      <h2>TODO App</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={newItem}
          onChange={(event) => { setNewItem(event.target.value) }}
        />
        <button type='submit'>
          Add
        </button>
      </form>
      <List items={items} />
    </div>
  )
}

const List: React.FC<ListProps> = ({ items }) => (
  <>
    {items.map(item => (
      <Item key={item.id} {...item} />
    ))}
  </>
)

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
