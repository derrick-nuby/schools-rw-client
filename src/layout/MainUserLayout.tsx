import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from '../components/ui/ScrollToTop';

const MainUserLayout: React.FC = () => {
    return (
        <>
            <ScrollToTop />
            <main>
                <ToastContainer
                    position='top-center'
                    autoClose={7000}
                />
                <Outlet />
            </main>
        </>
    );
};

export default MainUserLayout;