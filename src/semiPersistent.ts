import { useReducer, useState } from 'react'

export function useLocalStorageState<S> (
  key: string,
  initialState: S
): [S, React.Dispatch<React.SetStateAction<S>>] {
  const jsonValue = localStorage.getItem(key)
  initialState = jsonValue != null ? JSON.parse(jsonValue) : initialState

  const [value, setValue] = useState(initialState)
  const setLocalStorageValue = (value: any): void => {
    setValue(value)
    localStorage.setItem(key, JSON.stringify(value))
  }

  return [value, setLocalStorageValue]
}

export function useLocalStorageReducer<R extends React.Reducer<any, any>> (
  key: string,
  reducer: R,
  initialState: React.ReducerState<R>
): [React.ReducerState<R>, React.Dispatch<React.ReducerAction<R>>] {
  const jsonValue = localStorage.getItem(key)
  initialState = jsonValue != null ? JSON.parse(jsonValue) : initialState

  const localStorageReducer = (state: React.ReducerState<R>, action: React.ReducerAction<R>): React.ReducerState<R> => {
    const newState = reducer(state, action)
    localStorage.setItem(key, JSON.stringify(newState))
    return newState
  }

  return useReducer(localStorageReducer, initialState)
}
