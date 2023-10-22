import React from 'react'
import { Card } from 'semantic-ui-react'
import Link from 'next/link'
import Image from 'next/image'

type ImageListProps = {
  images: TImage[]
}

const mapImagesToCards = (images: TImage[]) =>
images.map(({ name, id, uploadDate, url }) => (
    <Link key={id} href={`/image/${id}`} passHref>
      <Card
        as="a"
        header={name}
        image={{ children:() =>  <Image src={url} width={333} height={333} alt={name}/> }}
        meta={{
          children:() =>  <Card.Meta style={{ color: 'dimgray' }}>{uploadDate.toString()}</Card.Meta>,
        }}
      />
    </Link>
  ))

const ImageList = ({ images }: ImageListProps) => (
  <Card.Group itemsPerRow={2} stackable>
    {mapImagesToCards(images)}
  </Card.Group>
)

export default ImageList