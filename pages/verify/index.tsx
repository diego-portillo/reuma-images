import React from 'react'
import { Image, Header } from 'semantic-ui-react'
import Layout from '@components/Layout/Layout'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import ImageList from '@components/ImageList/ImageList'

export const getStaticProps: GetStaticProps = async () => {
    const response = await fetch('http://localhost:3000/api/image')
    const { data: imageList }: TAPIReumaResponse = await response.json()
  
    return {
      props: {
        imageList,
      },
    }
  }

const AboutPage = ({ imageList }: { imageList: TImage[] }) => {
  return (
    <Layout>
      <section>
        <Header as="h1" textAlign="center">
          Verificar Imágenes
        </Header>
        <ImageList images={imageList} />
      </section>

      <style jsx>{`
        figure,
        ol {
          padding: 0;
          margin: 0;
        }
        section {
            text-align: center;
            margin-bottom: 2rem;
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
