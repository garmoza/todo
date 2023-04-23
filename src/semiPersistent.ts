import { useState } from 'react'

export default function useLocalStorage<S> (
  key: string,
  initialState: any
): [S, React.Dispatch<React.SetStateAction<S>>] {
  const [jsonValue, setJsonValue] = useState(
    localStorage.getItem(key) ?? JSON.stringify(initialState)
  )
  localStorage.setItem(key, jsonValue)

  return [
    JSON.parse(jsonValue),
    (value: any) => {
      setJsonValue(JSON.stringify(value))
      localStorage.setItem(key, JSON.stringify(value))
    }
  ]
}
