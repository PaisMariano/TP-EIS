import React             from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Register          from '../components/Register';
import Nav               from '../components/Nav';
import                        '../css/appStyles.css';

export default class App extends React.Component{

render(){
    return(
      <div className="root">
        <BrowserRouter>
          <Switch>
              <Route path="/" component={Register} />
          </Switch>
        </BrowserRouter>
      </div>
    ) ;
}
 
}
 
