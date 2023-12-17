import { Users } from '@ts/dto';
import Input from '@components/form/Input';
import Button from '@components/Button';
import type { ModalProps } from '.';

const RegisterModal = ({ onClose, onSuccess, app }: Pick<ModalProps, 'onClose' | 'onSuccess' | 'app'>) => {
    const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(ev.currentTarget);
        const formValues = Object.fromEntries(formData) as Users['register']['Request'];
        if (formValues.username && formValues.password) {
            app?.userService.register(formValues)
                .then(onSuccess)
                .catch(console.error);
        }
        ev.preventDefault();
        return false;
    };

    return (
        <div className='p-4'>
            <form onSubmit={onSubmit} className='flex flex-col gap-4'>
                <Input type="text" name="username" placeholder='Username' />
                <Input type="text" name="displayName" placeholder='Display name' />
                <Input type="email" name="email" placeholder='Email' />
                <Input type="password" name="password" placeholder='Password' />
                <div className='flex justify-center gap-4'>
                    <Button appearance='default' type="button" onClick={onClose}>Cancel</Button>
                    <Button appearance='primary' type="submit">Register</Button>
                </div>
            </form>
        </div>
    );
};

export default RegisterModal;