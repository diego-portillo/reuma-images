import React from 'react'
import fetch from 'isomorphic-unfetch'

import Layout from '@components/Layout/Layout'
import ImageSummary from '@components/ImageSummary/ImageSummary'
import { GetStaticPaths, GetStaticProps } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('https://localhost:3000/api/image')
  const { data }: TAPIReumaResponse = await response.json()

  const paths = data.map(({ id }) => ({ params: { id } }))

  return {
    // Statically generate all paths
    paths,
    // Display 404 for everything else
    fallback: false,
  }
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const response = await fetch(
    `http://localhost:3000/api/image/${params?.id}`
  )
  const image = await response.json()

  // Pass post data to the page via props
  return { props: { image } }
}

const ImagePage = ({ image }: { image: TImage }) => {
  return (
    <Layout>
      {image == null ? null : <ImageSummary image={image} />}
    </Layout>
  )
}

export default ImagePage