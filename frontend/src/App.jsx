import React, {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/Home/HomePage';
import ProfilePage from './pages/ProfilePage';
import {authStore} from './store/authStore';
import {Loader2} from 'lucide-react';
import MainLayout from './components/layout/MainLayout';

const App = () => {
  const {isCheckingAuth, authUser, checkAuth} = authStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader2 className='size-10 animate-spin' />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path='/login'
          element={authUser ? <Navigate to='/' /> : <LoginPage />}
        />
        <Route
          path='/signup'
          element={authUser ? <Navigate to='/' /> : <SignUpPage />}
        />

        {/* Protected Routes */}

        <Route element={authUser ? <MainLayout /> : <SignUpPage />}>
          <Route path='/' element={authUser ? <HomePage /> : <SignUpPage />} />
          <Route
            path='/profile'
            element={authUser ? <ProfilePage /> : <SignUpPage />}
          />
          <Route path='/profile/:username' element={<ProfilePage />} />
          {/* Add a catch-all route at the end */}
          <Route path='*' element={<Navigate to='/' />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
