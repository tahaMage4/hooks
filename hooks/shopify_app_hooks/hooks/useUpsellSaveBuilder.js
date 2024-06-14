import { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAppBridge } from '@shopify/app-bridge-react';
import { getSessionToken } from '@shopify/app-bridge-utils';

export const useUpsellSaveBuilder = (url) => {
    const [loading, setLoading] = useState(false);
    const [toastContent, setToastContent] = useState('');
    const [toastVisible, setToastVisible] = useState(false);
    const [isError, setIsError] = useState(false);

    const showToast = (content, error = false) => {
        setToastContent(content);
        setIsError(error);
        setToastVisible(true);
    };

    const hideToast = () => {
        setToastVisible(false);
    };


    const app = useAppBridge();
    // Post request
    const addPostRequest = async (formState) => {
        const token = await getSessionToken(app);
            const response = await axios.post(
                url,
                {
                    formState,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            );
            // setFormState(apiResponse);
            return response?.data;

    };

    const mutation = useMutation(addPostRequest, {
        onSuccess: (data) => {
            setLoading(false);
            showToast(data, false);
        },
        onError: (error) => {
            setLoading(false);
            showToast(error?.message, true);
        },
    });

    const handleFormBuilder = (formState) => {
        setLoading(true);
        mutation.mutate(formState);
    };

    return {
        loading,
        handleFormBuilder,
        toastContent,
        toastVisible,
        hideToast,
        isError
    };
};
