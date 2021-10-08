import logo from './logo.svg';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Users from './pages/Users';
import Projects from './pages/Projects';
import AddUser from './pages/AddUser';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/reports" exact component={Reports} />
          <Route path="/projects" exact component={Projects} />
          <Route path="/users" exact component={Users} />
          <Route path="/add-user" exact component={AddUser} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
