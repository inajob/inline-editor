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
      this.props.onUp(this.props.no)
      break;
      case 40: //down
      this.props.onDown(this.props.no)
      break;
      case 13: //enter
      this.props.onEnter(this.props.no)
      e.preventDefault()
      break;
    }
  }
  clickHandler(e){
    this.props.onClick(this.props.no);
  }
  render() {
    return (
      <div className={'line ' + this.props.className}>
        <textarea ref="rawInput" onChange={this.send} onKeyDown={this.keyHandler} onClick={this.clickHandler} value={this.props.text} />
      </div>
    )
  }
  updateFocus(){
    if(this.props.isFocus){
      this.refs.rawInput.focus();
    }
  }
  componentDidUpdate(){
    this.updateFocus()
  }
  componentDidMount(){
    this.updateFocus()
  }

}
Text.propTypes = {
  onChange: PropTypes.func.isRequired,
  onUp: PropTypes.func.isRequired,
  onDown: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  no: PropTypes.number.isRequires,
  text: PropTypes.string.isRequired
}

export default Line
