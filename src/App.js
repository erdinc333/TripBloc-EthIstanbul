import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import List from './pages/list/List';
import Hotel from './pages/hotel/Hotel';
import Login from './pages/login/Login';
import RegisterHotel from './pages/registerHotel/RegisterHotel';
import { Toaster } from 'react-hot-toast';
import { Auth0Provider } from '@auth0/auth0-react';

function App() {
  return (
    <>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <BrowserRouter>
          <Toaster position="bottom-left" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hotels" element={<List />} />
            <Route path="/hotels/:id" element={<Hotel />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterHotel />} />
          </Routes>
        </BrowserRouter>
      </Auth0Provider>
    </>
  );
}

export default App;
