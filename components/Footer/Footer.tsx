import React from 'react'
import Link from 'next/link'
import { Segment, Container, Grid, List, Header } from 'semantic-ui-react'

const Footer = () => (
  <Segment
    vertical
    as="footer"
    style={{
      padding: '4em 0em',
      marginTop: '3em',
      borderTop: '1px solid #f2f2f2',
    }}
  >
    <Container text>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={4}>
            <Header as="h4" content="Nosotros" />
            <List>
              <List.Item>
                <Link href="/about" passHref>
                  Conoce más
                </Link>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={5}>
            <Header as="h4" content="Imagenes" />
            <List>
              <List.Item>
                <Link href="/">
                  Todas las imágenes
                </Link>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as="h4">Demostración hecha para</Header>
            <p>
              <Link href="https://www.med.una.py/index.php/hospital-hc">Hospital de Clínicas</Link> por{' '}
              <Link href="https://diegoportillo.dev">Diego Portillo</Link>
            </p>
            <List horizontal style={{ display: 'flex' }}>
              <List.Item
                icon="linkedin"
                style={{ display: 'flex' }}
                content={<Link href="https://www.linkedin.com/in/diego-jose-portillo-martinez-a0a1b01a3/">LinkedIn</Link>}
              />
              <List.Item
                icon="github"
                style={{ display: 'flex' }}
                content={
                  <Link href="https://github.com/diego-portillo/reuma-images">
                    GitHub
                  </Link>
                }
              />
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <div className="colophon">
        <p className="colophon-entry">
          Íconos hechos por{' '}
          <Link
            target="_blank"
            href="https://www.flaticon.com/authors/freepik"
            title="Freepik"
          >
            Freepik
          </Link>
          {' de '}
          <Link target="_blank" href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </Link>
        </p>
        <p className="colophon-entry">
          Imágenes referenciales tomadas de{' '}
          <Link
            className="acnor"
            target="_blank"
            href="https://es.wikipedia.org"
            title="Wikipedia"
          >
           Wikipedia
          </Link>
        </p>
      </div>
    </Container>

    <style>{`
      .colophon {
        text-align: center;
        margin-top: 3.2rem;
        font-size: 0.8rem;
      }
      .colophon-entry {
        color: grey;
        margin-bottom: 0;
      }
    `}</style>
  </Segment>
)

export default Footer