import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import UpdateUser from './Components/DashboardBody/UpdateUser';
import Header from './Components/Header/Header';

function App () {
  return (
    <div className="text-center">
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/" component={ Dashboard } />
          <Route exact path="/dashboard" component={ Dashboard } />
          <Route exact path="/users/update/:userId" component={ UpdateUser } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
