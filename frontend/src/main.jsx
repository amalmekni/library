import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './bootstrap.min.css';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';
import BooksPage from './pages/BooksPage.jsx';
import AuthorsPage from './pages/AuthorsPage.jsx';
import MembersPage from './pages/MembersPage.jsx';
import LoanPage from './pages/LoanPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index element={<MainPage />}></Route>
      <Route path="/books" element={<BooksPage />}></Route>
      <Route path="/authors" element={<AuthorsPage />}></Route>
      <Route path="/members" element={<MembersPage />}></Route>
      <Route path="/loan" element={<LoanPage />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
