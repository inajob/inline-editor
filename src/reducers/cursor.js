function cursor(state = {col: 0, row: 0, dirty: false}, action){
  switch(action.type){
    case 'SET_CURSOR':
      return {
        row: action.row,
        col: action.col,
        dirty: action.dirty,
      }
  }
  return state;
}

export default cursor
