import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Home, Auth, Dashboard, Kas, Propo} from './pages';
import Header from './components/shared/Header';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import useLoadData from './hooks/useLoadData';
import FullScreenLoader from './components/shared/FullScreenLoader';

function Layout() {
  const [count, setCount] = useState(0);
  const isLoading = useLoadData();
  const location = useLocation();
  const HideHeaderRoutes = ['/auth'];
  const {isAuth} = useSelector  (state => state.user);
  
  if (isLoading) {
    return <FullScreenLoader />;
  }
  return (
    <>
      {/* <Router> */}
        {!HideHeaderRoutes.includes(location.pathname) && <Header />}
        <Routes>
          <Route path="/" element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>} />
          <Route path="/auth" element={isAuth ? <Navigate to="/" /> : <Auth /> } />
            <Route path="/dashboard" element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>} />
          <Route path="/kas" element={
            <ProtectedRoutes>
              <Kas />
            </ProtectedRoutes>} />
          <Route path="/propo" element={
            <ProtectedRoutes>
              <Propo />
            </ProtectedRoutes>} />
          <Route path="+" element={<div>404 Not Found</div>} />
        </Routes>
      {/* </Router> */}
    </>
  );
}

function ProtectedRoutes({children}) {
  const { isAuth } = useSelector(state => state.user);
  if(!isAuth){
    return <Navigate to="/auth" />
  }

  return children;
}

function App() {
  return (
  <Router>
    <Layout />
  </Router>
  );
}
export default App;