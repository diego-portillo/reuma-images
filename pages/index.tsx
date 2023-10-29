import React from 'react'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import fetch from 'isomorphic-unfetch'
import Layout from '@components/Layout/Layout'
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

const HomePage = ({ imageList }: { imageList: TImage[] }) => {
  return (
    <Layout>
      <ImageList images={imageList} />
      <style jsx>{`
        section {
          text-align: center;
          margin-bottom: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default HomePage