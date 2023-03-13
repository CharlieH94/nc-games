import { Route, Routes } from 'react-router-dom';
import './App.css';
import SingleReview from './components/SingleReview';
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
        <Route path='/reviews/:review_id' element={<SingleReview />} />
      </Routes>
    </div>
  );
}

export default App;