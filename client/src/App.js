import './App.css';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, NavLink} from 'react-router-dom';
import {createStore} from 'redux';
import {reducer} from './reducers/index';

const store = createStore(reducer, {displayDogs:{}, detailDogs:{}, temperaments:{}})
function App() {
  return (
    <BrowserRouter>
    <Provider store={store}>
      <div className="App">
        <h1>Henry Dogs</h1>
        <Route exact path='/'>
          <NavLink to = 'home'>Get started</NavLink>
        </Route>
        <Route path='home'></Route>
        <Route path= 'detail'></Route>
        <Route path= 'create'></Route>
      </div>
    </Provider>
    </BrowserRouter>
  );
}

export default App;
