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

export type ItemsAction =
  | ItemAddAction
  | ItemRemoveAction
