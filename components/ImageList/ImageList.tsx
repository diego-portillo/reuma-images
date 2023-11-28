import React from 'react';
import { Card } from 'semantic-ui-react';
import Link from 'next/link';
import Image from 'next/image';

type ImageListProps = {
  images: TImage[];
};

const mapImagesToCards = (images: TImage[]) =>
  images.map(({ name, id, uploadDate, url, uploadedBy }) => (
    <Link style={{margin: '2rem'}} key={id} href={`/images/${id}`} passHref className='card-link-container'>
      <Card>
        <div>
        <div className='image-container' style={{ margin: 'auto 0.5rem', height: '20rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Image src={url} layout="responsive" width={280} height={222} alt={name} style={{ maxHeight: '19rem', maxWidth: '100%' }} />
        </div>
        </div>
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Meta className='card-meta-text'>{uploadedBy}</Card.Meta>
          <Card.Meta className='card-meta-text'>{uploadDate.toString().substring(0, 10)}</Card.Meta>
        </Card.Content>
      </Card>
    </Link>
  ));

const ImageList = ({ images }: ImageListProps) => (
  <div className='image-list-container'>
    <Card.Group three centered className='cards-container'>
      {mapImagesToCards(images)}
    </Card.Group>
    <style jsx>{`
    .image-list-container, .cards-container{
      display: flex;
      justify-content:center;
      width:100%;
    }
      .card-meta-text{
        color: dimgray;
        text-align: center;
      }
      .image-container {
        width:90% !important;
        display: block !important;
      }
    `}</style>
  </div>
);

export default ImageList;
