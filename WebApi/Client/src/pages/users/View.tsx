import { action, makeObservable, observable } from 'mobx';

import { ViewStore } from '@shadowvzs/react-view-router';
import { UserRankEnum, type UserListItemDto } from '@ts/api';
import type { ViewInjector } from '@ts/types';
import { Users } from '@ts/dto';

export interface IView extends ViewStore {
    user: UserListItemDto | null;
    users: UserListItemDto[];
    isLoading: boolean;

    setUser: (user: UserListItemDto | null) => void;
    onSubmitAddGold: (ev: React.FormEvent<HTMLFormElement>) => void;
    onSubmitToggleGmStatus: (ev: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

class View extends ViewStore<ViewInjector> implements IView {
    @observable
    public users: UserListItemDto[] = [];

    @action.bound
    private setUsers(users: UserListItemDto[]) { this.users = users; }

    @observable
    public user: UserListItemDto | null = null;

    @action.bound
    public setUser(user: UserListItemDto | null) { this.user = user; }

    @observable
    public isLoading = false;

    @action.bound
    private setIsLoading(isLoading: boolean) { this.isLoading = isLoading; }

    constructor() {
        super();
        makeObservable(this);
    }

    public onSubmitAddGold = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        if (!this.user) { return; }
        const formData = new FormData(ev.currentTarget);
        const amount = formData.get('amount');
        if (!amount) { return; }
        const data: Users['addGold']['Request'] = {
            userId: this.user.id,
            amount: Number(amount)
        };
        await this.injectedData.app.userService.addGold(data);
    };

    public onSubmitToggleGmStatus = async (ev: React.MouseEvent<HTMLElement, MouseEvent>) => {
        ev.preventDefault();
        if (!this.user) { return; }
        const data: Users['changeUserRank']['Request'] = {
            userId: this.user.id,
            rank: this.user.rank ^ UserRankEnum.GM // xor - if it was a gm then demote, else promote
        };
        await this.injectedData.app.userService.changeUserRank(data);
        this.fetchUsers();
    };

    private fetchUsers = async () => {
        const { userService } = this.injectedData.app;
        this.setIsLoading(true);
        const users = await userService.getUsers({})
            .finally(() => { this.setIsLoading(false); });
        this.setUsers(users);
        if (this.user) {
            const user = users.find(user => user.id === this.user!.id);
            if (user) { this.setUser(user); }
        }
    };

    public canMount(): Promise<boolean> {
        const { user } = this.injectedData.app.userService;
        console.log('can mount', !!user);
        return Promise.resolve(!!user);
    }

    public beforeMount() {
        const { user } = this.injectedData.app.userService;
        if (!user) { this.router.history.navigate('/'); }
        this.fetchUsers();
    }
}

export default View;