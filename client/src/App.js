import React from 'react'

import './App.css';

//Components
import KickstarterMain from './components/Kickstarter-Main'
import CampaignPage from './components/Campaign/Campaign-Page'
import AddRequest from './components/Campaign/AddRequest'
import Navbar from './components/UI/Navbar'

//Router
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {

  return (
    <Router>
    <div className="App">
      <div className='App-header'>
        <Navbar/>
        <Switch>
          <Route exact path='/' component={KickstarterMain}/>
          <Route exact path='/campaign/:camp' component={CampaignPage} />
          <Route exact path='/campaign/request/:address' component={AddRequest} />
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
