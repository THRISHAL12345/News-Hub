import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NewsProvider } from './context/NewsContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WorldNews from './pages/WorldNews';
import TechNews from './pages/TechNews';
import SportsNews from './pages/SportsNews';
import BookmarkedNews from './pages/BookmarkedNews';

function App() {
  return (
    <NewsProvider>
      <Router>
        <div className="min-h-screen bg-neutral-50">
          <Navbar />
          <main className="pt-20 pb-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/world" element={<WorldNews />} />
              <Route path="/tech" element={<TechNews />} />
              <Route path="/sports" element={<SportsNews />} />
              <Route path="/bookmarks" element={<BookmarkedNews />} />
            </Routes>
          </main>
          <footer className="bg-neutral-800 text-white py-6">
            <div className="container-custom text-center">
              <p className="text-neutral-300">
                &copy; {new Date().getFullYear()} NewsHub. Powered by NewsData API.
              </p>
              <p className="text-xs text-neutral-400 mt-2">
                All news content is provided by various sources through the NewsData API and belongs to their respective owners.
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </NewsProvider>
  );
}

export default App;