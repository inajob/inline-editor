import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {changeLine, insertLine, deleteLine, setCursor} from '../actions'
import Line from './Line'
import Render from '../utils/render'

class Lines extends React.Component{
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        {this.props.lines.map((line, index) => (
          <Line
                key={index}
                {...line}
                onChange={this.props.onChange}
                onUp={this.props.onUp}
                onDown={this.props.onDown}
                onEnter={this.props.onEnter}
                onClick={this.props.onClick}
                onLeftUp={this.props.onLeftUp(
                        index==0?"":this.props.lines[index - 1])}
                onBS={this.props.onBSfunc(
                        index==0?"":this.props.lines[index - 1])}
                onRefreshed={this.props.onRefreshed}
                />
        ))}
      </div>
    )
  }
}
Lines.propTypes = {
  onChange: PropTypes.func.isRequired,
  onUp: PropTypes.func.isRequired,
  onDown: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onBSfunc: PropTypes.func.isRequired,
}

const addNumber = (lines => {
  return lines.map((line, index) => {
    line.no = index
    return line;
  })
})
const addFocus = ((col, row, dirty, lines) => {
  return lines.map((line, index) => {
    if(index == row){
      line.isFocus = true;
      line.column = col;
      line.dirty = dirty;
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
    lines: addClassName(addFocus(state.cursor.col, state.cursor.row, state.cursor.dirty, addNumber(state.lines))),
    cursor: state.cursor
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (no,text) => {
      dispatch(changeLine(no, text, Render(text)))
    },
    onUp: (no, col) => {
      if(no > 0){
        dispatch(setCursor(no - 1, col, true))
      }
    },
    onDown: (no, col) => {
      dispatch(setCursor(no + 1, col, true))
    },
    onEnter: (no, text, pos) => {
      dispatch(setCursor(no + 1, 0, true))
      if(text == undefined)text = ""
      let t1 = text.slice(0, pos)
      dispatch(changeLine(no, t1, Render(t1)))
      let t2 = text.slice(pos)
      dispatch(insertLine(no + 1, t2, Render(t2)))
    },
    onLeftUp: (pretext) => (no) =>{
      if(no > 0){
        dispatch(setCursor(no - 1, pretext.text.length, true))
      }
    },
    onBSfunc: (pretext) => (no, text) =>{
      dispatch(setCursor(no - 1, pretext.text.length, true))
      let t = pretext.text + text;
      dispatch(changeLine(no-1, t, Render(t)))
      dispatch(deleteLine(no))
    },
    onClick: (no) => {
      dispatch(setCursor(no, 0, true))
    },
    onRefreshed: (no) => {
      dispatch(setCursor(no, 0, false))
    }
  }
}

const LinesContainer = connect(mapStateToProps, mapDispatchToProps)(Lines)

export default LinesContainer
