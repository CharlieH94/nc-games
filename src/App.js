import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Reviews from './components/Reviews'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/reviews' element={<Reviews/>} />
      </Routes>
    </div>
  );
}

export default App;
