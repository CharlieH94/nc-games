import { Route, Routes } from 'react-router-dom';
import './App.css';
import SingleReview from './components/SingleReview';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/reviews/:review_id' element={<SingleReview />} />
      </Routes>
    </div>
  );
}

export default App;