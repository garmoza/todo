import React from 'react'
import type { FC } from 'react'
import { createStyles, rem } from '@mantine/core'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { IconGripVertical } from '@tabler/icons-react'

import { useItemsReducer } from './ItemsContext'
import Item from './Item'

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

  itemCompleted: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.blue[7] : theme.colors.blue[4]
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

interface DndListProps {
  active: string
}

const DndList: FC<DndListProps> = ({ active }) => {
  const { classes, cx } = useStyles()
  const [items, itemsDispatch] = useItemsReducer()

  const activeItems = items.filter(item => {
    switch (active) {
      case 'active':
        return !item.completed
      case 'completed':
        return item.completed
      default:
        return true
    }
  })
  const todos = activeItems.map((item, index) => (
    <Draggable key={item.id} index={index} draggableId={item.id.toString()}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
            [classes.itemCompleted]: item.completed
          })}
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
        let from = source.index
        let to = destination != null ? destination.index : 0

        // finds indexes of items, if used filter (all, active, completed links)
        if (active !== 'all') {
          const fromActive = activeItems[from]
          const toActive = activeItems[to]
          from = items.findIndex(item => item.id === fromActive.id)
          to = items.findIndex(item => item.id === toActive.id)
        }

        itemsDispatch({
          type: 'ITEMS_REORDER',
          payload: {
            from,
            to
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

export default DndList
