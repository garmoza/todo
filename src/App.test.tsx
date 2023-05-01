import React from 'react'
import renderer from 'react-test-renderer'

import { AppProvider } from './components/AppContext'
import SimpleHeader from './components/SimpleHeader'
import type { SimpleHeaderProps } from './components/SimpleHeader'
import { Switch } from '@mantine/core'

describe('<SimpleHeader />', () => {
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
    props.links.forEach(({ link, label }) => {
      expect(
        component.root.findAllByProps({ href: link, children: label })
          .length
      ).toEqual(1)
    })
  })

  it('renders <Switch />', () => {
    expect(component.root.findAllByType(Switch).length).toEqual(1)
  })

  it('calls setActive on link click', () => {
    props.links.forEach(({ link, label }, index) => {
      const pseudoEvent = { preventDefault: jest.fn() }
      component.root.findByProps({ href: link, children: label }).props.onClick(pseudoEvent)

      expect(pseudoEvent.preventDefault).toHaveBeenCalledTimes(1)
      expect(props.setActive).toHaveBeenCalledTimes(index + 1)
      expect(props.setActive).toHaveBeenCalledWith(link)
    })
  })
})
