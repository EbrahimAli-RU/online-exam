import { Switch, Route } from 'react-router-dom'
import Courses from './container/courses/Courses';

import Navigation from './layout/Navigation';
import Sidebar from './layout/Sidebar';
import './sass/main.scss'

function App() {
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'flex-start'}} >
      <Sidebar />
      <div style={{flexGrow: '1'}}>
      <Navigation />
        <Switch>
          
          <Route path='/course' component={Courses} />
        </Switch>
      </div>
      </div>
      
    </>
    
  );
}

export default App;
