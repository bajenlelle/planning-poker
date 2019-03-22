import React from 'react'
import classNames from 'classnames'

// Renders the bar chart
function BarGroup(props) {
  let barPadding = 2
  let barColour = '#348AA7'
  let widthScale = d => d * 10

  let width = widthScale(props.d.value)
  let yMid = props.barHeight * 0.5

  return <g className="bar-group">
    <text className="name-label" x="-6" y={yMid} alignmentBaseline="middle" >{props.d.name}</text>
    <rect y={barPadding * 0.5} width={width} height={props.barHeight - barPadding} fill={barColour} />
    <text className={classNames("value-label", { 'isZero': props.d.value === 0 }, { 'isOne': props.d.value === 1 })} x={width- 8} y={yMid} alignmentBaseline="middle" >{props.d.value}</text>
  </g>
}

class BarChartView extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      data: []
    }
  }

  componentWillReceiveProps(newProps){
    this.setState({ data: newProps.data })
  }

  componentDidMount() {
    this.setState({ data: this.props.data })
  }

  render() {
    let barHeight = 30

    let barGroups = this.state.data.map((d, i) => <g key={i} transform={`translate(0, ${i * barHeight})`}>
                                                    <BarGroup d={d} barHeight={barHeight} />
                                                  </g>)
    return <svg width="1000" height="450" >
      <g className="bar-container">
        <text className="title" x="10" y="30">Voting results for task: {this.props.task}</text>
        <g className="chart" transform="translate(100,60)">
          {barGroups}
        </g>
      </g>
    </svg>
  }
}

export default BarChartView
