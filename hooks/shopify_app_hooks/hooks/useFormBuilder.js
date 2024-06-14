import { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAppBridge } from '@shopify/app-bridge-react';
import { getSessionToken } from '@shopify/app-bridge-utils';

export const useFormBuilder = (url) => {
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
    // const addPostRequest = async ({ formState, specificCheked, filed, showToast }) => {
    //     const token = await getSessionToken(app);
    //     if (specificCheked?.product?.targetProduct === "Specific_Products" ? specificCheked?.product?.sepicificProduct?.length > 0
    //         : filed === "oneTick" ? null : specificCheked?.product?.offerProduct?.length > 0) {
    //         const response = await axios.post(
    //             url,
    //             {
    //                 formState,
    //             },
    //             {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     Authorization: "Bearer " + token,
    //                 },
    //             }
    //         );
    //         // setFormState(apiResponse);
    //         return response?.data;
    //     }else {
    //         showToast(`Please add at least one (Product Criteria) to the ${specificCheked?.product?.targetProduct === 'Specific_Products' ? "Specific product" : "Offer Product"} upsell?`, true);
    //         throw new Error(`Please add at least one (Product Criteria) to the ${specificCheked?.product?.targetProduct === 'Specific_Products' ? "Specific product" : "Offer Product"} upsell?`);

    //     }
    // };

    const addPostRequest = async ({ formState, specificCheked, filed, showToast }) => {
        console.log("specificCheked", specificCheked);
        const token = await getSessionToken(app);
        // if (filed === "oneTick") {
        //     if (specificCheked?.product?.targetProduct === "Specific_Products" && specificCheked?.product?.sepicificProduct?.length > 0) {
        //         const response = await axios.post(
        //             url,
        //             {
        //                 formState,
        //             },
        //             {
        //                 headers: {
        //                     "Content-Type": "application/json",
        //                     Authorization: "Bearer " + token,
        //                 },
        //             }
        //         );
        //         return response?.data;
        //     } else {
        //         showToast(`Please add at least one (Product Criteria) to the atahaaa Specific product upsell`, true);
        //         throw new Error(`Please add at least one (Product Criteria) to the Specific product upsell`);
        //     }
        // } else {
        //     if (specificCheked?.setting?.priority < 2 && specificCheked?.product?.targetProduct === "Specific_Products" ? specificCheked?.product?.sepicificProduct?.length > 0
        //         : specificCheked?.product?.offerProduct?.length > 0) {
        //         const response = await axios.post(
        //             url,
        //             {
        //                 formState,
        //             },
        //             {
        //                 headers: {
        //                     "Content-Type": "application/json",
        //                     Authorization: "Bearer " + token,
        //                 },
        //             }
        //         );
        //         return response?.data;
        //     } else {
        //         showToast(
        //             specificCheked?.setting?.priority < 2 ? "Value must be > 1" :
        //                 `Please add at least one (Product Criteria) to the ${specificCheked?.product?.targetProduct === 'Specific_Products' ? "Specific product" : "Offer Product"} upsell`, true);
        //         throw new Error(specificCheked?.setting?.priority < 2 ? "Value must be > 1" : `Please add at least one (Product Criteria) to the ${specificCheked?.product?.targetProduct === 'Specific_Products' ? "Specific product" : "Offer Product"} upsell`);
        //     }
        // }

        // const prePurchases = formState.upsells.Pre_Purchases || {};
        // const existingPriorities = Object.values(prePurchases || {})?.map(upsell => upsell.setting.priority);
        // console.log("existingPriorities", prePurchases, specificCheked.setting.priority);

        // if (existingPriorities.includes(specificCheked.setting.priority)) {
        //     showToast(`Priority ${specificCheked.setting.priority} is already selected.`, true);
        //     throw new Error(`Priority ${specificCheked.setting.priority} is already selected.`);
        // }

        if (specificCheked?.setting?.priority > 1) {
            if (specificCheked?.product?.targetProduct === "Specific_Products" ? specificCheked?.product?.sepicificProduct?.length > 0
                : specificCheked?.product?.offerProduct?.length > 0) {
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
                return response?.data;
            } else {
                showToast(
                    `Please add at least one (Product Criteria) to the ${specificCheked?.product?.targetProduct === 'Specific_Products' ? "Specific product" : "Offer Product"} upsell`, true);
                throw new Error(`Please add at least one (Product Criteria) to the ${specificCheked?.product?.targetProduct === 'Specific_Products' ? "Specific product" : "Offer Product"} upsell`);
            }
        } else {
            showToast(
                `${specificCheked?.setting?.priority < 2 && "Campaign priority must be > 1"} `, true);
            throw new Error(specificCheked?.setting?.priority < 2 && "Campaign priority must be > 1");
        }


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

    const handleFormBuilder = (formState, specificCheked, filed) => {
        setLoading(true);
        mutation.mutate({ formState, specificCheked, filed, showToast });
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

