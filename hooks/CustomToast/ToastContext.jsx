import React, { createContext, useContext } from 'react';
import { Toast } from '../components/UI';
import useToast from './useToast';

const ToastContext = createContext();

// export const useToastContext = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
    const { toasts, addToast } = useToast();

    return (
        <ToastContext.Provider value={addToast}>
            {children}
            <div className="toast-container">
                {toasts?.map((toast) => (
                    <Toast key={toast?.id} message={toast?.message} type={toast?.type} />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

const useToastContext = () => {
    const Toastcontext = useContext(ToastContext);
    if (
        !Toastcontext ||
        Toastcontext === null ||
        Toastcontext === undefined
    ) {
        throw new Error(
            "useToastContext must be wrap inthe parent compontent"
        );
    }
    return Toastcontext;
};

export { ToastProvider, ToastContext, useToastContext };
// export default ToastProvider;
