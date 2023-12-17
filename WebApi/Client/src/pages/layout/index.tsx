import { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import MemberLayout from '@pages/layout/member';
import GuestLayout from '@pages/layout/guest';
import { AppContext } from '@app/Provider';
import './style.css';

const layoutMap = {
    guest: GuestLayout,
    member: MemberLayout,
} as const;

const Layout = observer(() => {
    const { uiStore } = useContext(AppContext);
    const LayoutCmp = layoutMap[uiStore.layoutType];
    return <LayoutCmp />;
});

export default Layout;