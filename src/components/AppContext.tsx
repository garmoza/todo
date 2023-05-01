import React, { useState } from 'react'

import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { ItemsProvider } from './ItemsContext'
import type { ColorScheme } from '@mantine/core'

export function AppProvider ({ children }: React.PropsWithChildren): JSX.Element {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const toggleColorScheme = (value?: ColorScheme): void => {
    setColorScheme(value ?? (colorScheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <ItemsProvider>
          {children}
        </ItemsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
