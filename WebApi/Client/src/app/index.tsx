import React from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserHistory, RouterProvider } from '@shadowvzs/react-view-router';

import AppProvider, { AppContext } from '@app/Provider';
import Layout from '@pages/layout';
import Loader from '@components/Loader';
import type { ViewInjector } from '@ts/types';

const App = observer(() => {
    const history = React.useMemo(() => new BrowserHistory(), []);
    const appStore = React.useContext(AppContext);
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