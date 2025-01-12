import About from './components/About';
import Home from './components/Home';
import Login from './components/Login';
import { Navbar } from './components/Navbar';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import SignUp from './components/SignUp';

function App() {

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/Home" element={<Home/>} />
        </Routes>
        <Routes>
          <Route exact path="/About" element={<About/>} />
        </Routes>
        <Routes>
          <Route exact path="/" element={<Login/>} />
        </Routes>
        <Routes>
          <Route exact path="/signup" element={<SignUp/>} />
        </Routes>
      </Router>
    </>
  )
}
export default App