function lines(state = [{text:""}], action){
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
    case 'INSERT_LINE':
      console.log("INSERT_LINE", action.no, action.text)
      let newState = state.slice()
      newState.splice(action.no, 0, {text: action.text})
      return newState
  }
  return state
}

export default lines
