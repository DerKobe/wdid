import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Dispatcher from 'Dispatcher'

class Objekt extends PureComponent {
  static propTypes = {
    subject: PropTypes.shape().isRequired,
    level: PropTypes.number.isRequired,
    filter: PropTypes.string.isRequired,
  }

  get parts() {
    return Object.keys(this.props.subject).sort()
  }

  render() {
    const { subject, level, filter } = this.props

    return (
      <Grid container spacing={8}>
        {this.parts.map(name => (
          <Dispatcher
            key={name}
            name={name}
            subject={subject[name]}
            level={level + 1}
            filter={filter}
          />
        ))}
      </Grid>
    )
  }
}

export default Objekt
