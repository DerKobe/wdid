import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Function extends PureComponent {
  static propTypes = {
    subject: PropTypes.func.isRequired,
  }

  render() {
    const { subject } = this.props

    return (
      <pre>
        {subject.toString()}
      </pre>
    )
  }
}

export default Function
