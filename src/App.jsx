import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Dispatcher from 'Dispatcher'
import subject from './object-to-analyze'

class App extends Component {
  constructor() {
    super()
    this.state = { filter: '' }
  }

  handleChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  render() {
    const { filter } = this.state

    return (
      <Grid container spacing={8}>
        <Grid item xs={12} style={{ padding: '40px' }}>
          <TextField
            id="filter"
            label="Filter"
            value={this.state.name}
            onChange={this.handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Dispatcher
            filter={filter}
            name="commercetools request"
            subject={subject}
          />
        </Grid>
      </Grid>
    )
  }
}

export default App
