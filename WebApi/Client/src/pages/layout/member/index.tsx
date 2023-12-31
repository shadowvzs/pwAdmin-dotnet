import AppRoutes from '@app/Routes';
import Header from '@pages/layout/member/Header';
import Footer from '@pages/layout/member/Footer';

import './member.css';

const Layout = () => (
    <section className="layout h-full w-full grid grid-rows-[60px_auto_40px]">
        <Header />
        <main className='bg-[#ffffee] h-full'>
            <AppRoutes />
        </main>
        <Footer />
    </section>
);

export default Layout;