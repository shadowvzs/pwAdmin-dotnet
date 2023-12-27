import React from 'react';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';

import useConstant from '@app/hooks/useConstant';
import type { IAppStore } from '@ts/stores';
import { AppStore } from './Store';
import ErrorBoundary from './ErrorBoundary';

export const AppContext = React.createContext<IAppStore>(undefined!);

const AppProvider = ({ children }: { children: JSX.Element; }) => {
    const store = useConstant<IAppStore>(() => {
        const appStore = new AppStore();
        return appStore;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => () => store.dispose.call(store), []);

    return (
        <I18nProvider i18n={i18n}>
            <AppContext.Provider value={store}>
                <ErrorBoundary>
                    {children}
                </ErrorBoundary>
            </AppContext.Provider>
        </I18nProvider>
    );
};

export default AppProvider;