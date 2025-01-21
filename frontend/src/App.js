import {BrowserRouter,Routes, Route} from 'react-router-dom'

import Login from './components/Login';
import Home from './components/Home';
import Bookshelves from './components/Bookshelves';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route exact path="/" Component={Home} />
        <Route exact path="/book-hub" Component={Bookshelves} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;
