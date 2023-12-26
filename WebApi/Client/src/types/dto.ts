import type {
    RegisterCommand,
    CurrentUserDto,
    LoginCommand,
    UserListItemDto,
    ChangeUserRankCommand,
    AddGoldCommand,
    UserListQuery,
    ServerDetailsDto,
    ServerInstanceStatusDto,
    CheckInstancesStatusQuery,
    ManageInstancesCommand
} from './api/index';

export type IUser = CurrentUserDto;

export interface Users {
    login:{
        Request: LoginCommand;
        Response: CurrentUserDto;
    };
    register: {
        Request: RegisterCommand;
        Response: CurrentUserDto;
    };
    currentUser: {
        Request: void;
        Response: CurrentUserDto;
    };
    getUsers: {
        Request: Partial<UserListQuery>;
        Response: UserListItemDto[];
    };
    changeUserRank: {
        Request: ChangeUserRankCommand;
        Response: void;
    };
    addGold: {
        Request: AddGoldCommand;
        Response: void;
    };
};

export interface Servers {
    details:{
        Request: void;
        Response: ServerDetailsDto;
    };
    manageInstances: {
        Request: ManageInstancesCommand;
        Response: void;
    };
    checkInstancesStatus: {
        Request: CheckInstancesStatusQuery;
        Response: ServerInstanceStatusDto[];
    };
};
