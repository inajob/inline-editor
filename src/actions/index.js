
export const previewLine = (no, html) => ({
  type: 'PREVIEW_LINE',
  html,
  no,
})

export const changeLine = (no, text, preview) => ({
  type: 'CHANGE_LINE',
  text,
  preview,
  no,
})

export const deleteLine = (no, text) => ({
  type: 'DELETE_LINE',
  text,
  no,
})

export const insertLine = (no, text, preview) => ({
  type: 'INSERT_LINE',
  text,
  preview,
  no,
})

export const setCursor = (row, col) => ({
  type: 'SET_CURSOR',
  row,
  col,
})

