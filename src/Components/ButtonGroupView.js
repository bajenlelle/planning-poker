import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

class ButtonGroupView extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      selected: this.checkSelected()
    }
  }

  checkSelected() {
    // Checks previous selected point and returns it
    const { votes } = this.props.profile

    if (votes.some(e => e.id === this.props.pollId)) {
      return votes.find(obj => {
        return obj.id === this.props.pollId
      }).point
    } else {
      return ''
    }
  }

  onClick(e) {
    e.preventDefault()
    const prevPoint = this.state.selected
    let newPoint = e.target.value

    if (newPoint === this.state.selected) {
      this.setState({ selected: '' })
      newPoint = ''
    } else {
      this.setState({ selected: newPoint })
    }
    this.props.onVote(newPoint, prevPoint)
  }

  render() {
    const points = ['0', '1/2', '1', '2', '3', '5', '8', '13', '20', '40', '100']
    const buttons = points.map((point, i) => {
      const isSelected = this.state.selected === point
      return <button
              value={point}
              onClick={this.onClick.bind(this)}
              key={i} type="button"
              className={classNames("btn btn-lg rounded-pill", { 'btn-success': isSelected }, { 'btn-dark': !isSelected })}
                >{point}</button>
    })

    return (
      <div className="btn-toolbar justify-content-center align-items-center" role="toolbar" aria-label="Toolbar with button groups">
        <h2 className="align-middle mr-2 text-secondary">Vote here:</h2>
        <div className="btn-group mr-2" role="group" aria-label="First group">
          { buttons }
        </div>
        <div className="btn-group mr-2" role="group" aria-label="Second group">
          <Link
            hidden
            to='/polls'><button
            type="button"
            className="btn btn-lg rounded-pill btn-primary"
              >OK</button>
            </Link>
          </div>
      </div>
    )
  }
}

export default ButtonGroupView
