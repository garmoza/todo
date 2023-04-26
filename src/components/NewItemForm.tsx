import React from 'react'

import { useLocalStorageState } from '../hooks/semiPersistent'
import { useItemsReducer } from './ItemsContext'
import { Button, Input, createStyles, rem } from '@mantine/core'

const useStyles = createStyles(() => ({
  form: {
    display: 'flex',
    margin: `${rem(10)} 0`
  },
  input: {
    width: '100%',
    marginRight: rem(10)
  },
  button: {
    minWidth: rem(100)
  }
}))

export default function NewItemForm (): JSX.Element {
  const [items, itemsDispatch] = useItemsReducer()

  const [newItem, setNewItem] = useLocalStorageState('newItem', '')

  const { classes } = useStyles()

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
    <form onSubmit={handleSubmit} className={classes.form}>
      <Input
        value={newItem}
        onChange={(event) => { setNewItem(event.target.value) }}
        className={classes.input}
      ></Input>
      <Button type='submit' className={classes.button}>
        Add
      </Button>
    </form>
  )
}
