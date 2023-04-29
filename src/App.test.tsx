import React from 'react'
import renderer from 'react-test-renderer'

import Item, { ActiveItem } from './components/Item'

describe('truthy and falsy', () => {
  it('true to be true', () => {
    expect(true).toBe(true)
  })

  it('false to be false', () => {
    expect(false).toBe(false)
  })
})

describe('Item', () => {
  const item = {
    id: 1,
    title: 'Test todo',
    completed: false
  }

  it('renders all properties', () => {
    const component = renderer.create(<Item {...item} />)

    expect(component.root.findByType('h3').children).toEqual(
      ['Test todo']
    )
  })

  it('completed flag', () => {
    const component = renderer.create(<Item {...item} />)

    expect(component.root.findByType(ActiveItem).props.completed).toEqual(
      false
    )
  })
})
