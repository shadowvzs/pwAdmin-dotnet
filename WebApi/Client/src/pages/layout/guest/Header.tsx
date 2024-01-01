import { Link } from '@shadowvzs/react-view-router';

import useApp from '@hooks/useApp';

const Header = () => {
    const { uiStore } = useApp();

    return (
        <header className='header flex justify-between items-center col-span-2 px-8 bg-slate-100'>
            <nav className='flex gap-4'>
                <Link to='/'>Home</Link>
                <Link to='/item-builder'>Item Builder</Link>
                <div onClick={uiStore.openLoginModal}>Login</div>
                <div onClick={uiStore.openRegisterModal}>Register</div>
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