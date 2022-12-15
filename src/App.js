import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Users from './components/Users';
import './App.css';
import {BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar/>
      <Users/>
      <Footer/>
    </Router>
  );
}

export default App;
