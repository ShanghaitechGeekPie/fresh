import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { App, Level0App, Level1App } from '../components/App';
import NotFound from '../components/NotFound';

const Routes = ({ history }) =>
  <Router history={history}>
    <Route path="/" component={App} />
    <Route path="/:level0">
      <IndexRoute component={Level0App}/>
      <Route path=":level1" component={Level1App} />
    </Route>
  </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
