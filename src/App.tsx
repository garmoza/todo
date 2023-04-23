import React from 'react'

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
  const [items] = useLocalStorage<TodoItem[]>('todos', initialItems)

  return (
    <div className="App">
      <h2>TODO App</h2>
      <input/>
      <button type='button' >
        Add
      </button>
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

const Item: React.FC<TodoItem> = ({ id, title, completed }) => (
  <div>
    <h3>{title}</h3>
    {completed
      ? (
      <p>Completed</p>
        )
      : (
      <p>Active</p>
        )}
  </div>
)

export default App
