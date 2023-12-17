import { observer } from 'mobx-react-lite';
import type { IView } from './View';

const Cmp = observer(({ store }: { store: IView }) => {
    const { online } = store.serverDetails;

    return (
        <div>
            <h6>Welcome/Home view, you can found in /src/pages/home/Cmp.tsx - server is {online ? 'online' : 'offline'}</h6>
        </div>
    );
});

export default Cmp;