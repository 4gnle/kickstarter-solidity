import React, {useState, useEffect} from 'react'

import './App.css';

//Components
import KickstarterMain from './components/Kickstarter-Main'
import CampaignPage from './components/Campaign/Campaign-Page'
//ETH
import kickstarter from './ethereum/kickstarter'
import web3 from './ethereum/web3'

//Router
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {

  return (
    <Router>
    <div className="App">
      <div className='App-header'>
      <KickstarterMain/>
      </div>
    </div>
    <Switch>
      <Route path='/campaign/' component={CampaignPage} />
    </Switch>
    </Router>
  );
}

export default App;
