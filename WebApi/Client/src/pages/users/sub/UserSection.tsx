import Button from '@components/Button';
import Input from '@components/form/Input';
import { getUserRankText, getUsernameClassnames } from '@utility/ui-data-related-methods';
import { UserListItemDto, UserRankEnum } from '@ts/api';
import type { IView } from '../View';

export interface UserSectionProps extends Pick<IView, 'onSubmitAddGold' | 'onSubmitToggleGmStatus'> {
    user: UserListItemDto;

}

const UserSection = (props: UserSectionProps) => {
    const { user, onSubmitAddGold, onSubmitToggleGmStatus } = props;

    return (
        <section className='flex flex-col gap-4'>
            <h3 className='text-lg font-bold pb-4'>User Details</h3>
            <table>
                <tbody>
                    <tr><td className='font-bold'>Username:</td><td className={getUsernameClassnames(user)}>{user.username}</td></tr>
                    <tr><td className='font-bold'>Email:</td><td>{user.email}</td></tr>
                    <tr><td className='font-bold'>Display name:</td><td>{user.displayName}</td></tr>
                    <tr><td className='font-bold'>Rank:</td><td className={getUsernameClassnames(user)}>{getUserRankText(user)}</td></tr>
                    <tr><td className='font-bold'>Online:</td><td>{user.isOnline ? 'Yes' : 'No'}</td></tr>
                </tbody>
            </table>
            <div className='py-4'><hr /></div>
            <div>
                <form onSubmit={onSubmitAddGold} className='flex gap-4 justify-between items-center'>
                    <div>
                        <Input type='number' name='amount' />
                    </div>
                    <Button appearance='primary'>Add Gold</Button>
                </form>
            </div>
            <div className='flex gap-4 justify-between items-center'>
                <span>GM Status: {(user.rank & UserRankEnum.GM) ? 'GM' : 'NON-GM'} </span>
                <Button appearance='primary' onClick={onSubmitToggleGmStatus}>Toggle</Button>
            </div>
        </section>
    );
};

export default UserSection;