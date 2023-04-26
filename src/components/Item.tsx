import React, { useState } from 'react'
import { Input, createStyles, rem } from '@mantine/core'
import { IconTrash, IconEdit, IconCheck, IconCircleCheckFilled } from '@tabler/icons-react'

import { useItemsDispatch } from './ItemsContext'

import type { TodoItem } from '../types'

const useStyles = createStyles(() => ({
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  editing: {
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    marginRight: rem(5),
    margin: `${rem(15)} 0`
  },
  icons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  bottomIcons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '-10px',
    marginRight: '-20px'
  }
}))

export default function Item ({ id, title, completed }: TodoItem): JSX.Element {
  const itemsDispatch = useItemsDispatch()

  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(title)

  const { classes } = useStyles()

  return (
    <>
    {isEditing
      ? (
        <div className={classes.editing}>
          <Input
            className={classes.input}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
          />
          <IconCheck
            onClick={() => {
              itemsDispatch({
                type: 'ITEM_UPDATE',
                payload: {
                  id,
                  title: inputValue,
                  completed
                }
              })
              setIsEditing(false)
            }}
          />
        </div>
        )
      : (
        <div className={classes.item}>
          <h3>{inputValue}</h3>
          <div className={classes.icons}>
            <div>
            <IconEdit onClick={() => { setIsEditing(!isEditing) }} />
            <IconTrash color='red' onClick={() => {
              itemsDispatch({
                type: 'ITEM_REMOVE',
                payload: {
                  id,
                  title,
                  completed
                }
              })
            }} />
            </div>
            <div className={classes.bottomIcons}>
            <IconCircleCheckFilled size={rem(40)} />
            </div>
          </div>
        </div>
        )
    }
    </>
  )
}
