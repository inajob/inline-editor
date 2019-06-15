function lines(state = [{text:""}], action){
  let newState;
  switch(action.type){
    case 'CHANGE_LINE':
      console.log("CHANGE_LINE", action.no, action.text)
      return state.map((item, index) => {
        if(index !== action.no){
          return item
        }
        return {
          text: action.text
        }
      })
    case 'APPEND_LINE':
      console.log("APPEND_LINE", action.no, action.text)
      return state.map((item, index) => {
        if(index === action.no){
          return {text : item.text + action.text}
        }
        return item
      })
    case 'INSERT_LINE':
      console.log("INSERT_LINE", action.no, action.text)
      newState = state.slice()
      newState.splice(action.no, 0, {text: action.text})
      return newState
    case 'DELETE_LINE':
      console.log("DELETE_LINE", action.no)
      newState = state.slice()
      newState.splice(action.no, 1)
      return newState

  }
  return state
}

export default lines
