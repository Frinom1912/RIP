import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PageAddCountry } from 'pages/PageAddCountry';
import { PageAddHotel } from 'pages/PageAddHotel';
import { PageCountries } from 'pages/PageCountries';
import { PageCountry } from 'pages/PageCountry';
import { PageEdit } from 'pages/PageEdit';
import { PageEditCountry } from 'pages/PageEditCountry';
import { PageHotel } from 'pages/PageHotel';
import { PageMain } from 'pages/PageMain';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/hotel" />} />

        {/* Hotel block */}
        <Route path="/hotel" element={<PageMain />} />
        <Route path="/hotel/add" element={<PageAddHotel />} />
        <Route path="/hotel/:id/edit" element={<PageEdit />} />
        <Route path="/hotel/:id" element={<PageHotel />} />

        {/*Country block */}
        <Route path="/country" element={<PageCountries />} />
        <Route path="/country/add" element={<PageAddCountry />} />
        <Route path="/country/:id/edit" element={<PageEditCountry />} />
        <Route path="/country/:id" element={<PageCountry />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
