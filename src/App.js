import { Route, Routes, useLocation,useSearchParams } from 'react-router-dom';
import './App.css';
import SingleReview from './components/SingleReview';
import Header from './components/Header';
import Login from './components/Login';
import Reviews from './components/Reviews'
import { useState, useContext, useMemo } from 'react';
import { UserContext } from './contexts/User';
import ErrorPage from './components/ErrorPage';
import Nav from './components/Nav';

function App() {
  const { user } = useContext(UserContext)
  let location = useLocation();

  const [reviews, setReviews] = useState([]);

  const [searchParams] = useSearchParams();
  const [sortBySelection, setSortBySelection] = useState('created_at');
  const [orderSelection, setOrderSelection] = useState('desc');
  const [sortByCommentCount, setSortByCommentCount] = useState(false);

  const userSelectedCategory = searchParams.get('category')
  const params = useMemo(() => {
    return {category: userSelectedCategory}
  },[userSelectedCategory]);

  params.sort_by = sortBySelection;
  params.order = orderSelection;

  return (
    <div className="App">
      <Header user={user} />
      {location.pathname !== '/' && <Nav params={params} setOrderSelection={setOrderSelection} setSortBySelection={setSortBySelection} setReviews={setReviews} sortByCommentCount={sortByCommentCount} setSortByCommentCount={setSortByCommentCount} />}
      <Routes>
        <Route path='/?' element={<Login />} />
        <Route path='/reviews' element={<Reviews params={params} reviews={reviews} setReviews={setReviews} />} />
        <Route path='/reviews/:review_id' element={<SingleReview />} />
        <Route path='/*' element={<ErrorPage/>} />
      </Routes>
    </div>
  );
}

export default App;