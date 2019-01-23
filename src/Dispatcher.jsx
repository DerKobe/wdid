import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Objekt from 'Objekt'
import Function from 'Function'
import styles from 'Dispatcher.styles'

class Dispatcher extends PureComponent {
  static propTypes = {
    subject: PropTypes.any.isRequired,
    classes: PropTypes.shape().isRequired,
    name: PropTypes.string.isRequired,
    filter: PropTypes.string,
    level: PropTypes.number,
  }

  static defaultProps = {
    filter: '',
    level: 0,
  }

  constructor(props) {
    super(props)
    this.state = { expanded: props.level === 0 }
  }

  onChange = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  renderName = () => {
    const { subject, name } = this.props
    const objStyle = { fontSize: 10, color: '#00000055', fontStyle: 'italic' }
    const funcStyle = { color: '#00000088' }

    let signature

    switch (typeof subject) {
      case 'object':
        return <span>{name} <span style={objStyle}>Object</span></span>

      case 'function':
        signature = subject.toString()
          .split('{')[0]
          .replace(name, '')
          .replace('function ', '')

        return <span>{name} <span style={funcStyle}>{signature}</span></span>

      default:
        return name
    }
  }

  renderSubject = () => {
    const { subject, filter } = this.props

    switch (typeof subject) {
      case 'object':
        return <Objekt subject={subject} level={this.props.level} filter={filter} />

      case 'function':
        return <Function subject={subject} />

      default:
        return <div>{JSON.stringify(subject)}</div>
    }
  }

  render() {
    const {
      name, filter, level, classes,
    } = this.props
    const { expanded } = this.state

    if (level === 1 && filter.length > 0 && name.toLowerCase().indexOf(filter.toLowerCase()) === -1) return null

    return (
      <Grid item xs={12}>
        <ExpansionPanel expanded={expanded} onChange={this.onChange} classes={{ root: classes[`level${level}`] }}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              {this.renderName()}
            </Typography>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails>
            {expanded && this.renderSubject()}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    )
  }
}

export default withStyles(styles)(Dispatcher)
