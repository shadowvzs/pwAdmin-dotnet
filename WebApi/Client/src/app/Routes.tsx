import { Suspense } from 'react';
import { observer } from 'mobx-react-lite';

import { Route } from '@shadowvzs/react-view-router';
import HomePage from '@pages/home';
import UsersPage from '@pages/users';

const routes = [
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
        ViewStore: UsersPage.View,
        Cmp: UsersPage.Cmp,
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