import {BrowserRouter,Routes, Route} from 'react-router-dom'

import Login from './components/Login';
import Home from './components/Home';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route exact path="/" Component={Home} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;
