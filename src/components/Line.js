import React from 'react';
import PropTypes from 'prop-types'

class Line extends React.Component{
  constructor(props) {
    super(props)
    this.send = this.send.bind(this);
    this.keyHandler = this.keyHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }
  send(e){
    this.props.onChange(this.props.no, e.target.value)
    return;
  }
  keyHandler(e){
    switch(e.keyCode){
      case 38: //up
      this.props.onUp(this.props.no, e.target.selectionStart, this.props.text)
      break;
      case 40: //down
      this.props.onDown(this.props.no, e.target.selectionStart, this.props.text)
      break;
      case 37: //left
      // when cursor is head
      if(e.target.selectionStart === 0 && e.target.selectionEnd === 0){
        this.props.onLeftUp(this.props.no)
      }else{
      }
      break;
      case 39: //right
      // when cursor is end
      if(e.target.selectionStart === this.props.text.length){
        this.props.onDown(this.props.no, 0)
      }else{
      }
      break;
      case 13: //enter
      if(!this.props.onEnter(this.props.no, this.props.text, e.target.selectionStart)){
        e.preventDefault()
      }
      break;
      case 8: //BS
      // when cursor is head
      if(e.target.selectionStart === 0 && e.target.selectionEnd === 0){
        this.props.onBS(this.props.no, this.props.text)
        e.preventDefault()
      }
      break;
      default:
        // pass
    }
  }
  clickHandler(e){
    this.props.onClick(this.props.no);
  }
  render() {
    if(this.props.isBlock){
      return (
        <div className={'line ' + this.props.className} onClick={this.clickHandler}>
          <div style={{display: this.props.isFocus?"block":"none"}}>
            <textarea ref="rawInput" style={{height: this.props.height}} onChange={this.send} onKeyDown={this.keyHandler} value={this.props.text} />
          </div>
          <div>
            <div dangerouslySetInnerHTML={{__html:this.props.preview}} />
          </div>
        </div>
      )
    }else{
      // inline
      return (
        <div className={'line ' + this.props.className} onClick={this.clickHandler}>
          <div style={{display: this.props.isFocus?"block":"none"}}>
            <textarea ref="rawInput" style={{height: this.props.height}} onChange={this.send} onKeyDown={this.keyHandler} value={this.props.text} />
          </div>
          <div style={{display: !this.props.isFocus?"block":"none"}}>
            <div dangerouslySetInnerHTML={{__html:this.props.preview}} />
          </div>
        </div>
      )
    }
  }
  updateFocus(){
    if(this.props.isFocus){
      this.refs.rawInput.focus();
      if(this.props.dirty){
        var that = this;
        setTimeout(function(){
          console.log("update cursor");
          // FIXME: remove setTimeout
          that.refs.rawInput.setSelectionRange(that.props.column, that.props.column);
          that.props.onRefreshed(that.props.no);
        },10);
      }
    }
  }
  componentDidUpdate(){
    this.updateFocus()
  }
  componentDidMount(){
    this.updateFocus()
  }

}
Line.propTypes = {
  onChange: PropTypes.func.isRequired,
  onUp: PropTypes.func.isRequired,
  onDown: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onLeftUp: PropTypes.func.isRequired,
  onBS: PropTypes.func.isRequired,
  onRefreshed: PropTypes.func.isRequired,
  no: PropTypes.number.isRequired,
  isBlock: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Line
