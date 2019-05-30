function cursor(state = {col: 0, row: 0}, action){
  switch(action.type){
    case 'SET_CURSOR':
    return {
      row: action.row,
      col: action.col,
    }
  }
  return state;
}

export default cursor
