
export const changeLine = (no, text) => ({
  type: 'CHANGE_LINE',
  text,
  no,
})

export const insertLine = (no, text) => ({
  type: 'INSERT_LINE',
  text,
  no,
})

export const setCursor = (row, col) => ({
  type: 'SET_CURSOR',
  row,
  col,
})

