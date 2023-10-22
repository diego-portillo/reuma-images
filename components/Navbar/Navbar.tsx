import React, { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu, Container } from 'semantic-ui-react'

const Navbar = () => {
  const { pathname } = useRouter()

  return (
    <Menu size="huge" borderless pointing as="header">
      <Container text>
        <Link href="/" passHref>
          <Menu.Item
            active={pathname === '/'}
            title="Inicio | Todas las imágenes"
          >
            Avo Store
          </Menu.Item>
        </Link>
        <Menu.Menu position="right">
          <Link href="/cuenta" passHref>
            <Menu.Item active={pathname === '/cuenta'}>
            </Menu.Item>
          </Link>
        </Menu.Menu>
      </Container>
      <style>{`
        .ui.menu.huge {
          font-size: 1.5rem;
        }
      `}</style>
    </Menu>
  )
}

export default Navbar