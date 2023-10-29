import React from 'react'
import fetch from 'isomorphic-unfetch'

import Layout from '@components/Layout/Layout'
import ImageSummary from '@components/ImageSummary/ImageSummary'
import { GetStaticPaths, GetStaticProps } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('http://localhost:3000/api/image')
  console.log("response:" + response)
  const { data }: TAPIReumaResponse = await response.json()
  console.log("data: "+ data)
  const paths = data.map(({ id }) => ({ params: { id } }))
  console.log("paths:"+paths)
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
  console.log("response:" + response)
  const image = await response.json()
  console.log("image:" + image)
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