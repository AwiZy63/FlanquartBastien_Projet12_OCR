import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLoader from './AppLoader';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Router>
      <Routes>
        <Route path='/'>
          <Route path=':id' element={<AppLoader />} />
          <Route path='' element={<AppLoader />} />
        </Route>
      </Routes>
    </Router>
  </>
);

reportWebVitals();
