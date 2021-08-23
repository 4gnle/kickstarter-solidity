import React from 'react'

import './App.css';

//Components
import KickstarterMain from './components/Kickstarter-Main'
import CampaignPage from './components/Campaign/Campaign-Page'

//Router
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {

  return (
    <Router>
    <div className="App">
      <div className='App-header'>
        <Switch>
          <Route exact path='/' component={KickstarterMain}/>
          <Route exact path='/campaign/:camp' component={CampaignPage} />
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
