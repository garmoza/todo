import React from 'react'

import { useLocalStorageState } from '../hooks/semiPersistent'
import { useItemsReducer } from '../components/ItemsContext'
import { Button, Input } from '@mantine/core'

export default function NewItemForm (): JSX.Element {
  const [items, itemsDispatch] = useItemsReducer()

  const [newItem, setNewItem] = useLocalStorageState('newItem', '')

  function handleSubmit (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()

    let lastId = 0
    if (items.length > 0) {
      lastId = items.reduce(
        (previousItem, currentItem) => previousItem.id > currentItem.id ? previousItem : currentItem
      ).id
    }

    itemsDispatch({
      type: 'ITEM_ADD',
      payload: {
        id: lastId + 1,
        title: newItem,
        completed: false
      }
    })
    setNewItem('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={newItem}
        onChange={(event) => { setNewItem(event.target.value) }}
      ></Input>
      <Button type='submit'>
        Add
      </Button>
    </form>
  )
}
