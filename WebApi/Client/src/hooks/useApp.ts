import { useContext } from 'react';
import { AppContext } from '@app/Provider';

const useApp = () => {
    const ctx = useContext(AppContext);
    if (!ctx) {
        throw new Error('The AppContext missing');
    }
    return ctx;
};

export default useApp;