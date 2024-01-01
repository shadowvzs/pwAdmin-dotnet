import React from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserHistory, RouterProvider } from '@shadowvzs/react-view-router';

import AppProvider from '@app/Provider';
import useApp from '@hooks/useApp';
import Layout from '@pages/layout';
import Loader from '@components/Loader';
import type { ViewInjector } from '@ts/types';

const App = observer(() => {
    const history = React.useMemo(() => new BrowserHistory(), []);
    const appStore = useApp();
    React.useEffect(() => { appStore.init(); }, [appStore]);

    if (appStore.loading) { return <Loader />; }

    return (
        <RouterProvider<ViewInjector> history={history} injectedData={{ app: appStore }}>
            <Layout />
        </RouterProvider>
    );
});

const WrapperApp = () => <AppProvider><App /></AppProvider>;
export default WrapperApp;