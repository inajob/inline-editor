import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import App from './components/App'
import {insertLine} from './actions'
import './index.css';
import {Render} from './utils/render'

const store = createStore(rootReducer)
//const unsubscribe = store.subscribe(() => console.log("state",store.getState()))

store.dispatch(insertLine(0,
  "# React.jsで作ったインラインマークダウンエディタ",
  Render("# React.jsで作ったインラインマークダウンエディタ")
))
let text = "ブロック記法に対応しました"
store.dispatch(insertLine(1,
  text,
  Render(text)
))
text = ">> pre\n//ソースコードみたいなの\n alert('Hello World');"
store.dispatch(insertLine(2,
  text,
  Render(text)
))
store.dispatch(insertLine(3,
  "## 作った人",
  Render("## 作った人")
))
store.dispatch(insertLine(4,
  "@ina_ani",
  Render("@ina_ani")
))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
