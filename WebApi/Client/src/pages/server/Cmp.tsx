import { observer } from 'mobx-react-lite';
import Button from '@components/Button';
import { InstanceTypeEnum } from '@ts/api';
import type { IView } from './View';

const Cmp = observer(({ store }: { store: IView }) => {
    const { serverStatuses, onToggleServerStatus, onToggleMapStatus } = store;
    const apps = serverStatuses.filter(ins => ins.type === InstanceTypeEnum.App);
    const maps = serverStatuses.filter(ins => ins.type === InstanceTypeEnum.App);

    return (
        <div className='flex flex-row'>
            <div className='flex-1 bg-[#ffeeff] p-4 mx-auto'>
                <h3 className='text-lg font-bold'>Instance Table</h3>
                <table className='w-full table-fixed'>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        {apps.map(app => (
                            <tr key={app.id}>
                                <td>
                                    <div className={app.isRunning ? 'font-bold' : 'font-normal'}>
                                        {app.name}
                                    </div>
                                </td>
                                <td>{app.isRunning ? 'Running' : 'Not running'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='flex justify-center gap-4'>
                    <Button
                        appearance='ghost'
                        onClick={onToggleServerStatus}
                        disabled={maps.every(m => m.isRunning)}
                    >
                        Start
                    </Button>
                    <Button
                        appearance='ghost'
                        onClick={onToggleServerStatus}
                        disabled={maps.every(m => !m.isRunning)}
                    >
                        Stop
                    </Button>
                </div>
            </div>
            <div className='flex-1 bg-[#ffeeff] p-4 mx-auto'>
                <h3 className='text-lg font-bold'>Instance Table</h3>
                <table className='w-full table-fixed'>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Status</td>
                            <td> </td>
                        </tr>
                    </thead>
                    <tbody>
                        {serverStatuses.map(instanceStatus => (
                            <tr key={instanceStatus.id}>
                                <td>
                                    <div className={instanceStatus.isRunning ? 'font-bold' : 'font-normal'}>
                                        {instanceStatus.name}
                                    </div>
                                </td>
                                <td>{instanceStatus.isRunning ? 'Running' : 'Not running'}</td>
                                <td>
                                    <Button
                                        appearance='ghost'
                                        data-id={instanceStatus.id}
                                        onClick={onToggleMapStatus}
                                    >
                                        {instanceStatus.isRunning ? 'Stop' : 'Start'}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

export default Cmp;