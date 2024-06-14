import { useState } from 'react';

const useToast = () => {
    const [toasts, setToasts] = useState([]);
    const [id, setId] = useState(0);

    const addToast = (message, type = 'info') => {
        const newToast = { id, message, type };
        setToasts([...toasts, newToast]);
        setId(id + 1);

        // Remove the toast after 3 seconds
        setTimeout(() => {
            setToasts((currentToasts) =>
                currentToasts?.filter((toast) => toast?.id !== newToast?.id)
            );
        }, 3000);
    };

    return { toasts, addToast };
};

export default useToast;
