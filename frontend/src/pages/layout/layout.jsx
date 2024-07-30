import react from 'react';
import Navbar from '../navbar/navbar.jsx';
import { Outlet } from 'react-router-dom';
import Footer from '../navbar/footer.jsx';

function Layout()
{
    return (
        <>
        <Navbar/>
        <Outlet/>
        <Footer/>
        </>
    );
}

export default Layout;