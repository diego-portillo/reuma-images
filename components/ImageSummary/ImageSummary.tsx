import React from 'react'
import { Item, Label, Image } from 'semantic-ui-react'

import ImageAttributes from './ImageAttributes'

type ImageSummaryProps = {
  image: TImage
}

const ImageSummary = ({ image }: ImageSummaryProps) => (
  <>
    <Item.Group as="section">
      <Item style={{ alignItems: 'center' }}>
        <Item.Image size="medium">
          <Image src={image.url} alt={image.name} />
        </Item.Image>
        <Item.Content>
          <Item.Header as="h1">{image.name}</Item.Header>
          <Item.Description>
            <p>{image.uploadedBy}</p>
            <Label>{`Fecha: ${image.uploadDate}`}</Label>
          </Item.Description>
          <Item.Extra>
          
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
    <ImageAttributes {...image.attributes} />
  </>
)

export default ImageSummary