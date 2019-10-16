import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import App from './components/App'
import {insertLine} from './actions'
import './index.css';
import 'highlight.js/styles/github.css';  // choose your style!
import {Render} from './utils/render'
import {mermaidAPI} from 'mermaid'

const store = createStore(rootReducer)
//const unsubscribe = store.subscribe(() => console.log("state",store.getState()))

mermaidAPI.initialize({startOnLoad: true, theme: 'forest'});

function loadLine(no, text){
  store.dispatch(insertLine(no, text, Render(no,text)))
}

loadLine(0, "# React.jsで作ったインラインマークダウンエディタ")
loadLine(1, "インラインで編集ができる書式付きエディタです。")
loadLine(2, "http://inajob.hatenablog.jp URL自動リンクに対応しました。")
loadLine(3, "ブロック記法に対応しました")
loadLine(4, "## 整形済みテキスト")
loadLine(5, ">> pre\n　 ∧,,∧\n 　( `･ω･)\n 　/　∽ |")
loadLine(6, "## シンタックスハイライト")
loadLine(7, ">> code\n//ソースコードみたいなの\nfunction hoge(){\n  alert('Hello World');\n}")
loadLine(8, "## mermaidによる作画")
loadLine(9, ">> mermaid\ngraph LR\n図も描けます\nPlugin --> Pre\n Plugin --> Mermaid")
loadLine(10, "# 作った人")
loadLine(11, "https://twitter.com/ina_ani")
loadLine(12, "# GitHub")
loadLine(13, "https://github.com/inajob/inline-editor")

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
