import React, { useState } from 'react'

import { initialItems } from './scripts/data'
import useLocalStorage from './semiPersistent'

interface TodoItem {
  id: number
  title: string
  completed: boolean
}

interface ListProps {
  items: TodoItem[]
}

function App (): JSX.Element {
  const [items, setItems] = useLocalStorage<TodoItem[]>('todos', initialItems)
  const [newItem, setNewItem] = useState('')

  function handleSubmit (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()

    const lastItem = items.reduce(
      (previousItem, currentItem) => previousItem.id > currentItem.id ? previousItem : currentItem
    )
    setItems([
      ...items,
      {
        id: lastItem.id + 1,
        title: newItem,
        completed: false
      }
    ])
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
