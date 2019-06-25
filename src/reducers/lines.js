function lines(state = [{text:""}], action){
  let newState;
  switch(action.type){
    case 'PREVIEW_LINE':
      console.log("PREVIEW_LINE", action.no, action.preview)
      return state.map((item, index) => {
        if(index !== action.no){
          return item
        }
        return {
          text: item.text,
          preview: action.preview
        }
      })
    case 'CHANGE_LINE':
      console.log("CHANGE_LINE", action.no, action.text)
      return state.map((item, index) => {
        if(index !== action.no){
          return item
        }
        return {
          text: action.text,
          preview: action.preview
        }
      })
    case 'INSERT_LINE':
      console.log("INSERT_LINE", action.no, action.text)
      newState = state.slice()
      newState.splice(action.no, 0, {
        text: action.text,
        preview: action.preview
      })
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
