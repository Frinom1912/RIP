import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PageAddHotel } from 'pages/PageAddHotel';
import { PageHotel } from 'pages/PageHotel';
import { PageMain } from 'pages/PageMain';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageMain />} />
        <Route path="/hotel/add" element={<PageAddHotel />} />
        <Route path="/hotel/:id" element={<PageHotel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
