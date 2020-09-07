import React from 'react'
import { Route, Switch, Router } from 'react-router-dom'
import { Home, Employees, Offices, Departments } from '@containers'
import history from '@utils/history'

const Routes: React.FC = () => (
  <Router history={history}>
    <Switch>
      <Route exact path={'/'} component={Home} />
      <Route exact path={'/employees'} component={Employees} />
      <Route exact path={'/offices'} component={Offices} />
      <Route exact path={'/departments'} component={Departments} />
    </Switch>
  </Router>
)

export default Routes
