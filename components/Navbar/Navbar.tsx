import React, { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu, Container } from 'semantic-ui-react'

const Navbar = () => {
  const { pathname } = useRouter()

  return (
    <Menu size="large" borderless>
      <Container fluid>
      <Menu.Menu position="left">
          <Link href="/" passHref>
            <Menu.Item
              title="Inicio | Todas las imágenes"
              className={pathname === '/' ? 'active-link' : ''}
            >
              Imágenes
            </Menu.Item>
          </Link>
          <Link href="/about" passHref>
            <Menu.Item
              title="About"
              className={pathname === '/about' ? 'active-link' : ''}
            >
              Nosotros
            </Menu.Item>
          </Link>
          
      </Menu.Menu>
      <Menu.Menu position="right">
      <Link href="/iniciar-sesion" passHref>
            <Menu.Item className={pathname === '/cuenta' ? 'active-link' : ''}>
              Iniciar Sesión
            </Menu.Item>
          </Link>
          <Link href="/verify" passHref>
            <Menu.Item
              title="verify"
              className={pathname === '/verify' ? 'active-link' : ''}
            >
              Revisar Imágenes
            </Menu.Item>
          </Link>
      </Menu.Menu>
      </Container>
      <style>{`
        .ui.menu.huge {
          font-size: 1.5rem;
        }
        .active-link {
          background-color:grey;
        }
      `}</style>
    </Menu>
  )
}

export default Navbar