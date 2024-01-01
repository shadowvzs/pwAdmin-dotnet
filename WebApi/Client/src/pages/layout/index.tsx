import { observer } from 'mobx-react-lite';

import useApp from '@hooks/useApp';
import MemberLayout from '@pages/layout/member';
import GuestLayout from '@pages/layout/guest';
import './tailwind.css';

const layoutMap = {
    guest: GuestLayout,
    member: MemberLayout,
} as const;

const Layout = observer(() => {
    const { uiStore } = useApp();
    const LayoutCmp = layoutMap[uiStore.layoutType];
    return <LayoutCmp />;
});

export default Layout;