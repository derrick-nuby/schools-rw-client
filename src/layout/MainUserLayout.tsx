import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from '../components/ui/ScrollToTop';
import Header from '../components/ui/Header';

const MainUserLayout: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <ToastContainer position="top-center" autoClose={7000} />
        <Outlet />
      </main>
    </>
  );
};

export default MainUserLayout;
