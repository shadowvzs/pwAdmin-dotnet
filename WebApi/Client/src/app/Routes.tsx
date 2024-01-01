import { Suspense } from 'react';
import { observer } from 'mobx-react-lite';

import RouteGuard from '@app/RouteGuard';
import HomePage from '@pages/home';
import UsersPage from '@pages/users';
import ServerPage from '@pages/server';
import ItemBuilder from '@pages/item-builder';

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
    {
        path: '/item-builder',
        ViewStore: ItemBuilder.View,
        Cmp: ItemBuilder.Cmp,
    },
];

const AppRoutes = observer(() => (
    <main className='main w-full h-full m-0 px-8'>
        <Suspense fallback={null}>
            {routes.map((props, idx) => (
                <RouteGuard {...props} key={idx} />
            ))}
        </Suspense>
    </main>
));

export default AppRoutes;