import React, { useState } from 'react';

import { initialItems } from './scripts/data';

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

interface ListProps {
  items: TodoItem[];
}

function App() {
  const [items, setItems] = useState(initialItems);

  return (
    <div className="App">
      <h2>TODO App</h2>
      <input/>
      <button type='button' >
        Add
      </button>
      <List items={items} />
    </div>
  );
}

const List = ({ items }: ListProps) => (
  <>
    {items.map(item => (
      <Item key={item.id} {...item} />
    ))}
  </>
);

const Item = ({ id, title, completed }: TodoItem) => (
  <div>
    <h3>{title}</h3>
    {completed ? (
      <p>Completed</p>
    ) : (
      <p>Active</p>
    )}
  </div>
);

export default App;
