import React, { useState } from 'react'
import { Header, useMantineColorScheme, useMantineTheme, Switch, Container, Group, createStyles, rem } from '@mantine/core'
import { IconSun, IconMoonStars } from '@tabler/icons-react'

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%'
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none'
    }
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
    }
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color
    }
  }
}))

const links = [
  {
    link: '?yep',
    label: 'All'
  },
  {
    link: '?yep',
    label: 'Active'
  },
  {
    link: '?yep',
    label: 'Completed'
  }
]

export default function SimpleHeader (): JSX.Element {
  const [active, setActive] = useState(links[0].link)
  const { classes, cx } = useStyles()

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={(event) => {
        event.preventDefault()
        setActive(link.link)
      }}
    >
      {link.label}
    </a>
  ))

  return (
    <Header height={60} mb={120}>
      <Container className={classes.header}>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <SwitchToggle />
      </Container>
    </Header>
  )
}

function SwitchToggle (): JSX.Element {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()

  return (
    <Switch
        checked={colorScheme === 'dark'}
        onChange={() => { toggleColorScheme() }}
        size="lg"
        onLabel={<IconSun color={theme.white} size="1.25rem" stroke={1.5} />}
        offLabel={<IconMoonStars color={theme.colors.gray[6]} size="1.25rem" stroke={1.5} />}
      />
  )
}
