import { Link } from '@shadowvzs/react-view-router';
import useApp from '@hooks/useApp';

const Header = () => {
    const { uiStore } = useApp();

    return (
        <header className='header flex justify-between items-center col-span-2 px-8 bg-slate-100'>
            <nav className='flex gap-4'>
                <Link to='/servers'>Server Manager</Link>
                <Link to='/users'>users Manager</Link>
                <Link to='/item-builder'>Item Builder</Link>
                <div onClick={uiStore.onLogout}>Logout</div>
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