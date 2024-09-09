import { Toaster } from 'react-hot-toast';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/layout';


function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Define your route here  */}
          <Route path="/" element={<Layout />}>
            {/* Define your child route here  */}

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
    </>

  );
}

export default App;
