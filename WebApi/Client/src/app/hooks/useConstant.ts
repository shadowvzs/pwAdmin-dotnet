import { useRef } from 'react';

const useConstant = <T>(getterFn: () => T) => {
    const ref = useRef<{ v: T | undefined }>({ v: undefined });
    if (!ref.current.v) {
        ref.current.v = getterFn();
    }
    return ref.current.v;
};

export default useConstant;