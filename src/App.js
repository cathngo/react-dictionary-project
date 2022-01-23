
import './App.css';
import Home from './pages/Home'
import Navbar from './components/Navbar';
import SavedWords from './pages/SavedWords'
import Dictionary from './pages/Dictionary';
import Error from './pages/Error'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
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
