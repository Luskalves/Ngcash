import Login from './pages/Login';
import Register from './pages/Register';
import Provider from './context/Provider';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <Login /> } />
          <Route exact path="/register" element={ <Register /> } />
          <Route exact path="/home" element={ <Home /> } />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
