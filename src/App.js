import React from 'react';
import './App.css';
import Nav from './Components/Nav/Nav'
import routes from './routes'
import {Provider} from 'react-redux'
import store from './ducks/store'

function App() {
  // console.log(this.props)
  return (
  <Provider store={store}>
    <div className="App">
      <Nav />
      {routes}
    </div>
  </Provider>
    
  );
}

export default App;
