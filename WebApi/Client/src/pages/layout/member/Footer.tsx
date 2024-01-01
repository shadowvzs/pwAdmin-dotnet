import { observer } from 'mobx-react-lite';
import { Route } from '@shadowvzs/react-view-router';
import useApp from '@hooks/useApp';

const Footer = observer(() => {
    const ctx = useApp();
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