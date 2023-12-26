import { useContext } from 'react';
import { Link } from '@shadowvzs/react-view-router';
import { AppContext } from '@app/Provider';

const Header = () => {
    const { uiStore } = useContext(AppContext);

    return (
        <header className='header flex justify-between items-center col-span-2 px-8 bg-slate-100'>
            <nav className='flex gap-4'>
                <Link to='/servers'>Server Manager</Link>
                <Link to='/users'>users Manager</Link>
                <div onClick={uiStore.onLogout}>Logout</div>
                {/* <Link to='/templates'>Templates</Link>
                <Link to='/aaaa'>link to /aaaa1</Link> */}
            </nav>
            <aside className='flex gap-4'>
                {/* {isMobile && <BurgerMenu />}
                {!isMobile && <LanguageSelect />}
                {!isMobile && <ToolbarMenu />} */}
            </aside>
        </header>
    );
};

export default Header;