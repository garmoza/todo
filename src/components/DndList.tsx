import React, { useState } from 'react'
import { createStyles, rem } from '@mantine/core'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { IconGripVertical } from '@tabler/icons-react'

import { useItemsDispatch, useItemsReducer } from '../components/ItemsContext'

import type { TodoItem } from '../types'

const useStyles = createStyles((theme) => ({
  item: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    paddingLeft: `calc(${theme.spacing.xl} - ${theme.spacing.md})`, // to offset drag handle
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm
  },

  itemDragging: {
    boxShadow: theme.shadows.sm
  },

  symbol: {
    fontSize: rem(30),
    fontWeight: 700,
    width: rem(60)
  },

  dragHandle: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md
  }
}))

export default function DndList (): JSX.Element {
  const { classes, cx } = useStyles()
  const [items, itemsDispatch] = useItemsReducer()

  const todos = items.map((item, index) => (
    <Draggable key={item.id} index={index} draggableId={item.id.toString()}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps} className={classes.dragHandle}>
            <IconGripVertical size="1.05rem" stroke={1.5} />
          </div>
          <Item {...item} />
        </div>
      )}
    </Draggable>
  ))

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        itemsDispatch({
          type: 'ITEMS_REORDER',
          payload: {
            from: source.index,
            to: destination != null ? destination.index : 0
          }
        })
      }}
    >
      <Droppable droppableId="dnd-list" direction='vertical'>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {todos}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

const Item: React.FC<TodoItem> = ({ id, title, completed }) => {
  const itemsDispatch = useItemsDispatch()

  const [isEditing, setIsEditing] = useState(false)

  return (
    <div>
      <h3>{title}</h3>
      <button onClick={() => { setIsEditing(!isEditing) }} >
        {isEditing ? 'Save' : 'Edit'}
      </button>
      <button onClick={() => {
        itemsDispatch({
          type: 'ITEM_REMOVE',
          payload: {
            id,
            title,
            completed
          }
        })
      }}>
        Remove
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