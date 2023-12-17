import { Suspense } from 'react';
import { observer } from 'mobx-react-lite';

import { Route } from '@shadowvzs/react-view-router';
import HomePage from '@pages/home';
import UsersPage from '@pages/users';
import ServerPage from '@pages/server';

const routes = [
    {
        path: '',
        ViewStore: HomePage.View,
        Cmp: HomePage.Cmp,
    },
    {
        path: '/',
        ViewStore: HomePage.View,
        Cmp: HomePage.Cmp,
    },
    {
        path: '/users',
        ViewStore: UsersPage.View,
        Cmp: UsersPage.Cmp,
    },
    {
        path: '/servers',
        ViewStore: ServerPage.View,
        Cmp: ServerPage.Cmp,
    },
];

const AppRoutes = observer(() => (
    <main className='main w-full h-full m-0 px-8'>
        <Suspense fallback={null}>
            {routes.map((props, idx) => (
                <Route {...props} key={idx} />
            ))}
        </Suspense>
    </main>
));

export default AppRoutes;