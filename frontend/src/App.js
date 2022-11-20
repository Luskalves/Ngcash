import Login from './pages/Login';
import Register from './pages/Register';
import Provider from './context/Provider';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import NotFound from './pages/NotFound';
import Deposit from './pages/Deposit';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <Login /> } />
          <Route exact path="/home" element={ <Home /> } />
          <Route exact path="/deposit" element={ <Deposit /> } />
          <Route exact path="/register" element={ <Register /> } />
          <Route exact path="/transactions" element={ <Transactions /> } />
          <Route exact path="*" element={ <NotFound /> } />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
