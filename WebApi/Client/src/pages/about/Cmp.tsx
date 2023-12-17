import { observer } from 'mobx-react-lite';
import type { IView } from './View';

const Cmp = observer(({ store }: { store: IView }) => {
    console.log(store);

    return (
        <div>
            <h6>About page, you can found in /src/pages/about/Cmp.tsx</h6>
        </div>
    );
});

export default Cmp;