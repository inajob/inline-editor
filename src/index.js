import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import App from './components/App'
import {insertLine, changeLine} from './actions'
import './index.css';

const store = createStore(rootReducer)
const unsubscribe = store.subscribe(() => console.log("state",store.getState()))

store.dispatch(insertLine(0,"# React.jsで作ったインラインマークダウンエディタ"))
store.dispatch(insertLine(1,"カーソル移動などまだおかしいです。"))
store.dispatch(insertLine(2,"## 作った人"))
store.dispatch(insertLine(3,"@ina_ani"))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
