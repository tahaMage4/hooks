import React from 'react';
import './Toast.css';

const Toast = ({ message, type }) => (
    <div className={`toast ${type}`}>
        <div className="toast-message">{message}</div>
    </div>
);

export default Toast;
