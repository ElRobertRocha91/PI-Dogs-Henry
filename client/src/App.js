import './App.css';
//me traigo:
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';

//Envolvemos con el browserRuter todo el return de app

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component= {LandingPage}/>
        <Route path= '/home' component={Home}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
