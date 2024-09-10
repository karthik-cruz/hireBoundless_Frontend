import { Toaster } from 'react-hot-toast';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/layout';
import store, { persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
//importing pages -------------------
import Login from './pages/login/login';
import Signup from './pages/signup/signup';


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <Router>
          <Routes>
            {/* Define your route here  */}
            <Route path="/" element={<Layout />}>
              {/* Define your child route here  */}
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
          </Routes>
        </Router>

        <Toaster
          position="bottom-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{

          }}
          toastOptions={{
            // Define default options
            className: '',
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },

            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
        />

      </PersistGate>
    </Provider>

  );
}

export default App;
