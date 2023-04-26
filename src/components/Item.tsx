import React, { useState } from 'react'
import { createStyles } from '@mantine/core'
import { IconTrash, IconEdit } from '@tabler/icons-react'

import { useItemsDispatch } from './ItemsContext'

import type { TodoItem } from '../types'

const useStyles = createStyles(() => ({
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  }
}))

export default function Item ({ id, title, completed }: TodoItem): JSX.Element {
  const itemsDispatch = useItemsDispatch()

  const [isEditing, setIsEditing] = useState(false)

  const { classes } = useStyles()

  return (
    <div className={classes.item}>
      <h3>{title}</h3>
      <div>
        <IconEdit onClick={() => { setIsEditing(!isEditing) }} >
          {isEditing ? 'Save' : 'Edit'}
        </IconEdit>
        <IconTrash color='red' onClick={() => {
          itemsDispatch({
            type: 'ITEM_REMOVE',
            payload: {
              id,
              title,
              completed
            }
          })
        }}/>
      </div>
    </div>
  )
}
