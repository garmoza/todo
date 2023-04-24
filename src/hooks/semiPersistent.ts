import { useReducer, useState } from 'react'

import type { Dispatch, SetStateAction, Reducer, ReducerState, ReducerAction } from 'react'

export function useLocalStorageState<S> (
  key: string,
  initialState: S
): [S, Dispatch<SetStateAction<S>>] {
  const jsonValue = localStorage.getItem(key)
  initialState = jsonValue != null ? JSON.parse(jsonValue) : initialState

  const [value, setValue] = useState(initialState)
  const setLocalStorageValue = (value: any): void => {
    setValue(value)
    localStorage.setItem(key, JSON.stringify(value))
  }

  return [value, setLocalStorageValue]
}

export function useLocalStorageReducer<R extends Reducer<any, any>> (
  key: string,
  reducer: R,
  initialState: ReducerState<R>
): [ReducerState<R>, Dispatch<ReducerAction<R>>] {
  const jsonValue = localStorage.getItem(key)
  initialState = jsonValue != null ? JSON.parse(jsonValue) : initialState

  const localStorageReducer = (state: ReducerState<R>, action: ReducerAction<R>): ReducerState<R> => {
    const newState = reducer(state, action)
    localStorage.setItem(key, JSON.stringify(newState))
    return newState
  }

  return useReducer(localStorageReducer, initialState)
}
