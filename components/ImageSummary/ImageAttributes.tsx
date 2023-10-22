import React from 'react'
import { Header, Divider, Table } from 'semantic-ui-react'

const ImageAttributes = ({
  description,
  ...otherAttributes
}: TImageAttributes) => (
  <section className="container">
    <Header as="h3">Sobre esta imagen</Header>
    <p>{description}</p>

    <Divider />

    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="2">Detalles</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {Object.keys(otherAttributes).map((key) => (
          <Table.Row key={key}>
            <Table.Cell className="attr-name">{key}</Table.Cell>
            <Table.Cell>
              {otherAttributes[key as keyof typeof otherAttributes].toString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>

    <style>{`
      .container :global(.attr-name) {
        text-transform: capitalize;
      }
    `}</style>
  </section>
)

export default ImageAttributes