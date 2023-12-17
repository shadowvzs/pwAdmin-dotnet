import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Route } from '@shadowvzs/react-view-router';
import { AppContext } from '@app/Provider';

const Footer = observer(() => {
    const ctx = useContext(AppContext);
    console.log(ctx);
    // const isMobile = uiStore.isMobile;

    return (
        <footer className="footer w-full col-span-2 px-8 flex items-center bg-slate-100">
            <Route path='/aaaa' element={<div>element: /aaaa1</div>} />
            footer
        </footer>
    );
});

export default Footer;