import React, { PropsWithChildren } from 'react'
import { Container } from 'semantic-ui-react'

import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

type LayoutProps = {
  children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <Navbar />
    <Container as="main">
      {children}
    </Container>
    <Footer />
  </>
)

export default Layout