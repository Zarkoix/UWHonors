import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
//  Redirect,
} from 'react-router-dom';
import Preview from './Pages/Preview';
import NotFound from './Pages/NotFound';
import BlogPost from './Pages/BlogPost/BlogPost'
import './App.css';
import LandingPage from './Pages/Landing'

const App = (props) => (
  <Router>
    <Switch>
      <Route exact path="/" render={routeProps => <LandingPage {...routeProps} prismicCtx={props.prismicCtx} />} />
      <Route exact path="/post/:uid" render={routeProps => <BlogPost {...routeProps} prismicCtx={props.prismicCtx} />} />
      <Route exact path="/preview" render={routeProps => <Preview {...routeProps} prismicCtx={props.prismicCtx} />} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
