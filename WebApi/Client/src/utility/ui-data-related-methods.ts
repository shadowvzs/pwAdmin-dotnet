import { UserRankEnum, type UserListItemDto } from '@ts/api';

export const getUsernameClassnames = (user: UserListItemDto) => {
    const cn: string[] = [];
    if (user.isOnline) { cn.push('font-bold'); }
    if (user.rank & UserRankEnum.GM) { cn.push('text-blue-600'); }
    if (user.rank & UserRankEnum.ADMIN) { cn.push('text-red-600'); }
    return cn.join('');
};

export const getUserRankText = (user: UserListItemDto) => ['Member', 'GM', 'Admin', 'Admin + GM'][user.rank];