import React, { createContext, useContext } from 'react'

import { initialItems } from '../scripts/data'
import { useLocalStorageReducer } from '../hooks/semiPersistent'

import type { TodoItem, ItemsAction } from '../types'

const ItemsContext = createContext(null as any)
const ItemsDispatchContext = createContext(null as any)

interface ItemsProviderProps {
  children: React.ReactNode
}

export function ItemsProvider ({ children }: ItemsProviderProps): JSX.Element {
  const [items, dispatchItems] = useLocalStorageReducer('todos', itemsReducer, initialItems)

  return (
    <ItemsContext.Provider value={items}>
      <ItemsDispatchContext.Provider value={dispatchItems}>
        {children}
      </ItemsDispatchContext.Provider>
    </ItemsContext.Provider>
  )
}

export function useItems (): TodoItem[] {
  return useContext(ItemsContext)
}

export function useItemsDispatch (): React.Dispatch<ItemsAction> {
  return useContext(ItemsDispatchContext)
}

export function useItemsReducer (): [TodoItem[], React.Dispatch<ItemsAction>] {
  return [useContext(ItemsContext), useContext(ItemsDispatchContext)]
}

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
      return state.filter(item => item.id !== action.payload.id)
    case 'ITEM_UPDATE':
      return state.map(item => item.id === action.payload.id ? action.payload : item)
    case 'ITEMS_UPDATE':
      return action.payload
    case 'ITEMS_REORDER': {
      const from = action.payload.from
      const to = action.payload.to

      const cloned = [...state]
      const item = state[from]

      cloned.splice(from, 1)
      cloned.splice(to, 0, item)

      return cloned
    }
    default:
      throw new Error()
  }
}
