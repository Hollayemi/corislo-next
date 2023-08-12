import { toaster, Message } from 'rsuite';
import 'toasted-notes/src/styles.css';

const redirect = () => {
    localStorage.setItem('user_token', null);
    localStorage.setItem('store_token', null);
    toaster.push(
        <Message showIcon type="error" duration={5000}>
            Redirecting to Login
        </Message>,
        {
            placement: 'bottomCenter',
        }
    );
    setTimeout(() => (window.location.href = '/login'), 1000);
};

export default (error) => {
    if (error?.data) {
        const { errors, message } = error.data;

        if (message) {
            toaster.notify(message, {
                duration: '4000',
                position: 'bottom',
            });
            if (message === 'token_expired') {
                redirect();
            }
        }
        if (errors && typeof errors === Array) {
            errors.forEach((error) => {
                toaster.notify(error.code, {
                    duration: '4000',
                    position: 'bottom',
                });
            });
        }
    }
};
