import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import EditPost from './components/EditPost';
import CreatePostPage from './pages/CreatePostPage';
import HomePage from './pages/HomePage';
import PostDetail from './pages/PostDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;