export interface TodoItem {
  id: number
  title: string
  completed: boolean
}

interface ItemAddAction {
  type: 'ITEM_ADD'
  payload: TodoItem
}

interface ItemRemoveAction {
  type: 'ITEM_REMOVE'
  payload: TodoItem
}

interface ItemsUpdateAction {
  type: 'ITEMS_UPDATE'
  payload: TodoItem[]
}

interface ItemsReorderAction {
  type: 'ITEMS_REORDER'
  payload: {
    from: number
    to: number
  }
}

export type ItemsAction =
  | ItemAddAction
  | ItemRemoveAction
  | ItemsUpdateAction
  | ItemsReorderAction
