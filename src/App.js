import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import AvailableBooks from './pages/AvailableBooks';
import Upload from './pages/Upload';
import User from './pages/Users';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/availablebooks" element={<AvailableBooks />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/users" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
