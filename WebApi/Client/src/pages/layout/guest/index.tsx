import AppRoutes from '@app/Routes';
import Aside from '@pages/layout/guest/Aside';
import Header from '@pages/layout/guest/Header';
import Footer from '@pages/layout/guest/Footer';

import './guest.css';

const Layout = () => (
        <section className="layout h-full w-full grid grid-cols-[240px_auto] grid-rows-[60px_auto_40px]">
            <Header />
            <Aside />
            <main className='bg-[#ffffee]'>
                <AppRoutes />
            </main>
            <Footer />
        </section>
    );

export default Layout;