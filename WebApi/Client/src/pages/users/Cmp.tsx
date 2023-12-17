import { observer } from 'mobx-react-lite';
import Button from '@components/Button';
import { getUsernameClassnames } from '@utility/ui-data-related-methods';
import UserSection from './sub/UserSection';
import type { IView } from './View';

const Cmp = observer(({ store }: { store: IView }) => {
    const { user, users, setUser, onSubmitAddGold, onSubmitToggleGmStatus } = store;

    return (
        <div className='flex flex-row'>
            <div className='min-w-[400px] bg-[#ffeeff] p-4'>
                <h3 className='text-lg font-bold'>Users Table</h3>
                <p className='py-4'>
                    <b>Note:</b>
                        <span className='flex gap-2'>
                            <span className='text-red-600'>Red - Admin</span>,
                            <span className='text-blue-600'>Blue - GM</span>,
                            <span>* - Online</span>
                        </span>
                </p>
                <table className='w-full table-fixed'>
                    <thead>
                        <tr>
                            <td>Username</td>
                            <td>Display name</td>
                            <td> </td>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>
                                    <div className={getUsernameClassnames(user)}>
                                        {user.username}{user.isOnline ? '*' : ''}
                                    </div>
                                </td>
                                <td>{user.displayName}{user.isOnline ? '*' : ''}</td>
                                <td><Button appearance='ghost' onClick={() => setUser(user)}>Select</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='min-w-[400px] bg-[#ffeeee] p-4'>
                {user && (
                    <UserSection
                        user={user}
                        onSubmitAddGold={onSubmitAddGold}
                        onSubmitToggleGmStatus={onSubmitToggleGmStatus}
                    />
                )}
            </div>
        </div>
    );
});

export default Cmp;