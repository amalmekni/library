import React from 'react';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
};

export default App;
