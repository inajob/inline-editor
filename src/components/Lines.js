import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {changeLine, insertLine, appendLine, deleteLine, setCursor} from '../actions'
import Line from './Line'

class Lines extends React.Component{
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        {this.props.lines.map((line, index) => (
          <Line key={index} {...line} onChange={this.props.onChange} onUp={this.props.onUp} onDown={this.props.onDown} onEnter={this.props.onEnter} onClick={this.props.onClick} onBS={this.props.onBS} />
        ))}
      </div>
    )
  }
}
Lines.propTypes = {
  onChange: PropTypes.func.isRequired,
}

const addNumber = (lines => {
  return lines.map((line, index) => {
    line.no = index
    return line;
  })
})
const addFocus = ((row, lines) => {
  return lines.map((line, index) => {
    if(index == row){
      line.isFocus = true;
    }else{
      line.isFocus = false;
    }
    return line;
  });
})
const calcClassName = (text) => {
  let className = "normal"
  if(text.indexOf("###") == 0){
    className = "h3"
  }else if(text.indexOf("##") == 0){
    className = "h2"
  }else if(text.indexOf("#") == 0){
    className = "h1"
  }
  return className;
}
const addClassName = (lines => {
  return lines.map(line => {
    line.className = calcClassName(line.text);
    if(line.isFocus){
      line.className += " focus"
    }
    return line;
  })
})

const mapStateToProps = (state, ownProps) => {
  return {
    lines: addClassName(addFocus(state.cursor.row, addNumber(state.lines))),
    cursor: state.cursor
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (no,text) => {
      dispatch(changeLine(no, text))
    },
    onUp: (no) => {
      if(no > 0){
        dispatch(setCursor(no - 1))
      }
    },
    onDown: (no) => {
      dispatch(setCursor(no + 1))
    },
    onEnter: (no) => {
      dispatch(setCursor(no + 1))
      dispatch(insertLine(no + 1, ""))
    },
    onBS: (no, text) => {
      dispatch(setCursor(no - 1))
      dispatch(appendLine(no-1, text))
      dispatch(deleteLine(no))
    },
    onClick: (no) => {
      dispatch(setCursor(no))
    },
  }
}

const LinesContainer = connect(mapStateToProps, mapDispatchToProps)(Lines)


export default LinesContainer
