import React from 'react'
import renderer from 'react-test-renderer'

import { AppProvider } from './components/AppContext'
import SimpleHeader from './components/SimpleHeader'
import type { SimpleHeaderProps } from './components/SimpleHeader'
import { Button, Switch } from '@mantine/core'
import App, { links } from './App'
import DndList from './components/DndList'
import NewItemForm from './components/NewItemForm'

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

  const testRenderer = renderer.create(
    <AppProvider>
      <SimpleHeader {...props} />
    </AppProvider>
  )
  const testInstance = testRenderer.root

  it('renders links', () => {
    props.links.forEach(({ link, label }) => {
      expect(
        testInstance.findAllByProps({ href: link, children: label })
          .length
      ).toEqual(1)
    })
  })

  it('renders <Switch />', () => {
    expect(testInstance.findAllByType(Switch).length).toEqual(1)
  })

  it('calls setActive on link click', () => {
    props.links.forEach(({ link, label }, index) => {
      const pseudoEvent = { preventDefault: jest.fn() }
      testInstance.findByProps({ href: link, children: label }).props.onClick(pseudoEvent)

      expect(pseudoEvent.preventDefault).toHaveBeenCalledTimes(1)
      expect(props.setActive).toHaveBeenCalledTimes(index + 1)
      expect(props.setActive).toHaveBeenCalledWith(link)
    })
  })

  it('renders snapshot', () => {
    expect(testRenderer.toJSON()).toMatchSnapshot()
  })
})

describe('<NewItemForm />', () => {
  let testRenderer: renderer.ReactTestRenderer, testInstance: renderer.ReactTestInstance

  beforeEach(() => {
    testRenderer = renderer.create(
      <AppProvider>
        <NewItemForm />
      </AppProvider>
    )
    testInstance = testRenderer.root
  })

  it('disables the button', () => {
    expect(
      testInstance.findByType(Button).props.disabled
    ).toBeTruthy()
  })

  // ! doesn't work because it uses localStorage
  // it('change the input field', async () => {
  //   const pseudoEvent = { target: 'New Todo' }
  //   const input = testInstance.findByType(Input)

  //   await renderer.act(async () => {
  //     input.props.onChange(pseudoEvent)
  //   })

  //   expect(input.props.value).toEqual('New Todo')
  // })

  it('renders snapshot', () => {
    expect(testRenderer.toJSON()).toMatchSnapshot()
  })
})

describe('<DndList />', () => {
  const testRenderer = renderer.create(
    <AppProvider>
      <DndList active='all' />
    </AppProvider>
  )

  it('renders snapshot', () => {
    expect(testRenderer.toJSON()).toMatchSnapshot()
  })
})

describe('<App />', () => {
  let testRenderer: renderer.ReactTestRenderer, testInstance: renderer.ReactTestInstance

  beforeEach(() => {
    testRenderer = renderer.create(<App />)
    testInstance = testRenderer.root
  })

  it('passed props to <SimpleHeader />', () => {
    const header = testInstance.findByType(SimpleHeader)

    expect(header.props.active).toEqual('all')
    expect(header.props.links).toEqual(links)
  })

  it('passed props to <DndList />', () => {
    const list = testInstance.findByType(DndList)

    expect(list.props.active).toEqual('all')
  })

  it('change active state for <SimpleHeader />', async () => {
    const header = testInstance.findByType(SimpleHeader)

    expect(header.props.active).toEqual('all')

    await renderer.act(async () => {
      const pseudoEvent = { preventDefault: jest.fn() }
      header.findByProps({ href: 'completed', children: 'Completed' }).props.onClick(pseudoEvent)
    })

    expect(header.props.active).toEqual('completed')
  })

  it('change active state for <DndList />', async () => {
    const header = testInstance.findByType(SimpleHeader)
    const dndList = testInstance.findByType(DndList)

    expect(header.props.active).toEqual('all')
    expect(dndList.props.active).toEqual('all')

    await renderer.act(async () => {
      const pseudoEvent = { preventDefault: jest.fn() }
      header.findByProps({ href: 'completed', children: 'Completed' }).props.onClick(pseudoEvent)
    })

    expect(dndList.props.active).toEqual('completed')
  })

  it('renders snapshot', () => {
    expect(testRenderer.toJSON()).toMatchSnapshot()
  })
})
