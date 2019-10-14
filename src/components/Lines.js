import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {changeLine, insertLine, deleteLine, setCursor} from '../actions'
import Line from './Line'
import {isBlock, Render, getCursorPos, numLines, getLines} from '../utils/render'

class Lines extends React.Component{
  //constructor(props) {
  //  super(props)
  //}
  render() {
    return (
      <div>
        {this.props.lines.map((line, index) => (
          <Line
                key={index}
                {...line}
                onChange={this.props.onChange}
                onUp={this.props.onUp(
                        index===0?"":this.props.lines[index - 1])}
                onDown={this.props.onDown(
                        index>=this.props.lines.length - 1?"":this.props.lines[index + 1])}
                onEnter={this.props.onEnter}
                onTab={this.props.onTab}
                onClick={this.props.onClick}
                onLeftUp={this.props.onLeftUp(
                        index===0?"":this.props.lines[index - 1])}
                onBS={this.props.onBSfunc(
                        index===0?"":this.props.lines[index - 1])}
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
    if(index === row){
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
  if(isBlock(text)){
    className = "block"
  }else{
    if(text.indexOf("###") === 0){
      className = "h3"
    }else if(text.indexOf("##") === 0){
      className = "h2"
    }else if(text.indexOf("#") === 0){
      className = "h1"
    }
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
const addHeight = (lines => {
  return lines.map(line => {
    line.height = numLines(line.text)*16 + "px"
    return line;
  })
})

const addIsBlock = (lines => {
  return lines.map(line => {
    line.isBlock = isBlock(line.text)
    return line;
  })
})


const mapStateToProps = (state, ownProps) => {
  return {
    lines: addClassName(addIsBlock(addHeight(addFocus(state.cursor.col, state.cursor.row, state.cursor.dirty, addNumber(state.lines))))),
    cursor: state.cursor
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (no,text) => {
      dispatch(changeLine(no, text, Render(no, text)))
    },
    onUp: (upText) => (no, col, text) => {
      if(no <= 0){
        return;
      }
      let pos = getCursorPos(col,text);
      if(isBlock(text) && pos[1] > 0){
        return;
      }
      if(isBlock(upText.text)){
        let lines = getLines(upText.text);
        lines.pop()
        let firstPart = lines.join("\n");
        dispatch(setCursor(no - 1, firstPart.length + col, true))
      }else{
        dispatch(setCursor(no - 1, col, true))
      }
    },
    onDown: (downText) => (no, col, text) => {
      let num = numLines(text);
      let pos = getCursorPos(col,text);
      if(isBlock(text) && pos[1] < num - 1){
        return;
      }
      if(isBlock(downText.text)){
        let lines = getLines(downText.text);
        let firstLine = lines[0];
        dispatch(setCursor(no + 1, Math.min(col, firstLine.length), true))
      }else{
        dispatch(setCursor(no + 1, col, true))
      }
    },
    onEnter: (no, text, pos, shift) => {
      if(isBlock(text)){
        if(shift){
          dispatch(insertLine(no + 1, "", ""))
          dispatch(setCursor(no + 1, 0, true))
          return false;
        }
        return true;
      }else{
        dispatch(setCursor(no + 1, 0, true))
        if(text === undefined)text = ""
        let t1 = text.slice(0, pos)
        dispatch(changeLine(no, t1, Render(no, t1)))
        let t2 = text.slice(pos)
        dispatch(insertLine(no + 1, t2, Render(no + 1, t2)))
        return false; // prevent default
      }
    },
    onTab: (no, text, shift) => {
      if(shift){
        if(text.search(/-+ /) == 0){ // already list
          if(text.indexOf("- ") == 0){
            text = text.slice(2);
          }else{
            text = text.slice(1);
          }
        }else{ // not list
          // none
        }
      }else{
        if(text.search(/-+/) == 0){ // already list
          text = "-" + text
        }else{ // first list
          text = "- " + text
        }
      }
      dispatch(changeLine(no, text, Render(no, text)))
    },
    onLeftUp: (pretext) => (no) =>{
      if(no > 0){
        dispatch(setCursor(no - 1, pretext.text.length, true))
      }
    },
    onBSfunc: (pretext) => (no, text) =>{
      dispatch(setCursor(no - 1, pretext.text.length, true))
      let t = pretext.text + text;
      dispatch(changeLine(no-1, t, Render(no - 1, t)))
      dispatch(deleteLine(no))
    },
    onClick: (no) => {
      dispatch(setCursor(no, 0, false))
    },
    onRefreshed: (no) => {
      dispatch(setCursor(no, 0, false))
    }
  }
}

const LinesContainer = connect(mapStateToProps, mapDispatchToProps)(Lines)

export default LinesContainer
