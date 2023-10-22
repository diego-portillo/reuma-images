import React from 'react'
import { Image, Header } from 'semantic-ui-react'
import Layout from '@components/Layout/Layout'
import Link from 'next/link'

const avoFacts = [
  {
    title: 'Aplicación Web Demostrativa: Banco de imágenes para estudios reumatológicos.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus, leo in mattis hendrerit, sapien sem placerat leo, accumsan viverra odio nisl nec sem. Cras consectetur, metus vel vestibulum venenatis, sem metus tincidunt neque, ac aliquam sem erat at lorem. Cras pretium euismod gravida. In varius tortor eget erat venenatis vulputate. Etiam non felis massa. Nam eu tellus ut lectus sagittis tincidunt. Morbi id metus gravida, laoreet nunc a, facilisis eros. Vestibulum viverra efficitur lacus quis aliquet. Nullam nulla mi, rhoncus quis congue vitae, ultricies a massa. In hac habitasse platea dictumst. In id facilisis libero, at hendrerit turpis. Etiam congue nisl nisl, at varius ex eleifend semper. Pellentesque vel pretium massa.',
  },
  {
    title: 'Financiamiento del proyecto',
    content:
      'Nulla facilisis, lectus pharetra sodales interdum, lorem eros efficitur lorem, non malesuada dolor leo quis sapien. In efficitur, elit eu convallis accumsan, neque turpis suscipit lorem, quis porttitor purus tortor non ex. Quisque urna magna, vestibulum non quam quis, ullamcorper laoreet enim. Phasellus gravida ac mi at pharetra. Vivamus maximus orci et vestibulum cursus. Aenean commodo lobortis urna, ac viverra est finibus vel. Mauris vel sodales purus, vitae tempor metus. Praesent tempus ante facilisis leo tempor pretium. Nam maximus libero id felis mollis luctus. Aliquam malesuada, tellus non.',
  },
  {
    title: 'Colaboradores',
    content:
      'Paola Pusineri, Bruna Pusineri, Sodales Interdum, Nulla Facilisis, Lectus Pharetra',
  }
]

const AboutPage = () => {
  return (
    <Layout>
      <section>
        <Header as="h1" textAlign="center">
          Sobre este proyecto
        </Header>
        <figure>
          <Image src="/images/demo.webp" alt="reuma-hand" />
          <figcaption>
            Desarrollado por{' '}
            <Link
              target="_blank"
              href="https://diegoportillo.dev/"
            >
              Diego Portillo
            </Link>
          </figcaption>
        </figure>
        <ul>
          {avoFacts.map(({ title, content }) => (
            <li key={title}>
              <h3 className="ui header">{title}</h3>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      </section>

      <style jsx>{`
        figure,
        ol {
          padding: 0;
          margin: 0;
        }

        figure {
          margin: 2rem auto 3rem;
          text-align: center;
        }
        figcaption {
          margin-top: 0.5rem;
          font-site: 0.7rem;
          color: grey;
        }

        ul {
          list-style: none;

          // Look ma! Responsive grid with no Media queries :)
          // https://css-tricks.com/look-ma-no-media-queries-responsive-layouts-using-css-grid/
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          grid-gap: 4.5rem 3rem;

          // Look ma! A CSS Counter :)
          // https://moderncss.dev/totally-custom-list-styles/
          counter-reset: orderedlist;
        }
        

        li {
          position: relative;
        }
        h3:first-child {
          // why the first-child selector you may ask...
          // to gain specificity and thus avoid using '!important' :)
          padding-left: 40px;
          margin-bottom: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default AboutPage
