
import './App.css';
import Home from './pages/Home'
import Navbar from './components/Navbar';
import SavedWords from './pages/SavedWords'
import Dictionary from './pages/Dictionary';
import Error from './pages/Error'
//router
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

//page switch 
import history from './history';
function App() {
  return (

    <Router history={history}>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/save' element={<SavedWords/>}/>
        <Route path='/define/:word' element={<Dictionary/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </Router>

  );
}

export default App;
