import React from 'react'
import renderer from 'react-test-renderer'

import { AppProvider } from './components/AppContext'
import SimpleHeader from './components/SimpleHeader'
import type { SimpleHeaderProps } from './components/SimpleHeader'

describe('SimpleHeader', () => {
  const props: SimpleHeaderProps = {
    links: [
      {
        link: 'all',
        label: 'All'
      },
      {
        link: 'active',
        label: 'Active'
      },
      {
        link: 'completed',
        label: 'Completed'
      }
    ],
    active: 'all',
    setActive: jest.fn()
  }

  const component = renderer.create(
    <AppProvider>
      <SimpleHeader {...props} />
    </AppProvider>
  )

  it('renders links', () => {
    expect(
      component.root.findAllByProps({ children: 'All' })
        .length
    ).toEqual(1)
  })
})
