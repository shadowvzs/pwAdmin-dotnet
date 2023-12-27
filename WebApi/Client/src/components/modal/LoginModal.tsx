import React from 'react';
import { Users } from '@ts/dto';
import Input from '@components/form/Input';
import Button from '@components/Button';
import type { AxiosError } from 'axios';
import type { ModalProps } from '.';

const LoginModal = ({ onClose, onSuccess, app }: Pick<ModalProps<void, void>, 'onClose' | 'onSuccess' | 'app'>) => {
    const onSubmit = React.useCallback((ev: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(ev.currentTarget);
        const formValues = Object.fromEntries(formData) as Users['login']['Request'];
        if (formValues.username && formValues.password) {
            app?.userService.login(formValues)
                .then(onSuccess)
                .catch(err => {
                    const e = err as AxiosError<{ errors: string; }>;
                    alert(e.response?.data?.errors ?? e.message);
                });
        }
        ev.preventDefault();
        return false;
    }, [app?.userService, onSuccess]);

    return (
        <div className='p-4'>
            <form onSubmit={onSubmit} className='flex flex-col gap-4'>
                <Input type="text" name="username" placeholder='Username' required />
                <Input type="password" name="password" placeholder='Password' required />
                <div className='flex justify-center gap-4'>
                    <Button appearance='default' type="button" onClick={onClose}>Cancel</Button>
                    <Button appearance='primary' type="submit">Login</Button>
                </div>
            </form>
        </div>
    );
};

export default LoginModal;