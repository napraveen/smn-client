import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import AvailableBooks from './pages/AvailableBooks';
import Upload from './pages/Upload';
import User from './pages/Users';
import IssuedBooks from './pages/IssuedBooks';
import DueDates from './pages/DueDates';
import PageNotFound from './pages/PageNotFound';
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
        <Route path="/issuedbooks" element={<IssuedBooks />}></Route>
        <Route path="/duedates" element={<DueDates />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
