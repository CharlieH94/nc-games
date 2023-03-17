import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import SingleReview from './components/SingleReview';
import Header from './components/Header';
import Login from './components/Login';
import Reviews from './components/Reviews'
import ErrorPage from './components/ErrorPage';
import Nav from './components/Nav';

function App() {
  let location = useLocation();

  return (
    <div className="App">
      <Header/>
      {location.pathname !== '/' && <Nav/>}
      <Routes>
        <Route path='/?' element={<Login />} />
        <Route path='/reviews' element={<Reviews />} />
        <Route path='/reviews/:review_id' element={<SingleReview />} />
        <Route path='/*' element={<ErrorPage/>} />
      </Routes>
    </div>
  );
}

export default App;