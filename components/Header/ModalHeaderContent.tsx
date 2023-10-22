import React from 'react'
import { Grid, Header } from 'semantic-ui-react'

const ModalHeaderContent = () => {
  return (
    <div className="container">
      <Grid columns={2}>
        <Grid.Row verticalAlign={'middle'}>
          <Grid.Column width="11">
            <Header as="h2">Imágenes Reumatológicas</Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <style>{`
        .container {
          padding: 2rem;
        }
      `}</style>
    </div>
  )
}

export default ModalHeaderContent