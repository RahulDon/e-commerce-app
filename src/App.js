import React from 'react';
import { Switch, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import Productlist from './components/Productlist';
import Details from './components/Details';
import Cart from './components/Cart';
import Defaultpage from './components/Defaultpage';

import Modal from './components/Modal';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Productlist}/>
        <Route path="/details" component={Details}/>
        <Route path="/cart" component={Cart}/>
        <Route component={Defaultpage}/>
      </Switch>
      <Modal />
    </React.Fragment>
  );
}

export default App;
