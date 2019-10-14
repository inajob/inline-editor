import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import App from './components/App'
import {insertLine} from './actions'
import './index.css';
import {Render} from './utils/render'
import {mermaidAPI} from 'mermaid'

const store = createStore(rootReducer)
//const unsubscribe = store.subscribe(() => console.log("state",store.getState()))

mermaidAPI.initialize({startOnLoad: true, theme: 'forest'});

store.dispatch(insertLine(0,
  "# React.jsで作ったインラインマークダウンエディタ",
  Render(0,"# React.jsで作ったインラインマークダウンエディタ")
))
let text = "ブロック記法に対応しました"
store.dispatch(insertLine(1,
  text,
  Render(1,text)
))
text = ">> pre\n//ソースコードみたいなの\n alert('Hello World');"
store.dispatch(insertLine(2,
  text,
  Render(2,text)
))
text = ">> mermaid\ngraph LR\n図も描けます\nPlugin --> Pre\n Plugin --> Mermaid"
store.dispatch(insertLine(3,
  text,
  Render(3,text)
))
store.dispatch(insertLine(4,
  "## 作った人",
  Render(4,"## 作った人")
))
store.dispatch(insertLine(5,
  "@ina_ani",
  Render(5,"@ina_ani")
))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
