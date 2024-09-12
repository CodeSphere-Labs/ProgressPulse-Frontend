import { Code, Group } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import { useState } from 'react'

import classes from './Navbar.module.css'
import { itemsForWorker } from './navbarItems'

export const Navbar = () => {
  const [active, setActive] = useState('Progress')

  const links = itemsForWorker.map((item) => (
    <a
      key={item.label}
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      onClick={(event) => {
        event.preventDefault()
        setActive(item.label)
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ))

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <img src="@../../pulse.webp" width={40} alt="logo" />
          <Code fw={700}>v1.0.0</Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <button
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  )
}
