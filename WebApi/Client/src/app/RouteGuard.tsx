import useApp from '@hooks/useApp';
import { IRouteData, Route } from '@shadowvzs/react-view-router';
import { UserRankEnum } from '@ts/api';
import { observer } from 'mobx-react-lite';

interface RouteGuardProps extends IRouteData {
    rank?: UserRankEnum;
    redirectTo?: string;
}

const RouteGuard = observer(({ rank, redirectTo, ...props }: RouteGuardProps) => {
    const { userService: { user } } = useApp();

    if (rank !== undefined && rank !== user?.rank) {
        console.log(redirectTo);
    }
    return <Route {...props} />;
});

export default RouteGuard;