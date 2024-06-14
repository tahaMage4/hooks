import { useEffect, useState } from "react";
import axios from "axios";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { useAppBridge } from "@shopify/app-bridge-react";
import Swal from "sweetalert2";
export const useSettingsManagement = (getUrl, postUrl, value, selected_upsell,  uniqueId, updateFormState) => {
    const app = useAppBridge();
    const [isLoading, setIsLoading] = useState(false);
    const [isSetLoading, setIsSetLoading] = useState(false);
    const [settingsObj, setSettingsObj] = useState([]);
    const [error, setError] = useState(undefined);

    useEffect(() => {
        if (value === "custom") {
            getSettings();
        }
    }, [uniqueId]);



    const getSettings = async () => {
        setIsLoading(true);
        try {
            const token = await getSessionToken(app);
            const response = await axios.get(getUrl, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            setSettingsObj(response?.data);
            // updateFormState(response?.data)

        } catch (err) {
            setError(err);
            Swal.fire({
                icon: "error",
                title: err,
                text: err,
                showClass: {
                    popup: "animate__animated animate__fadeInDown",
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp",
                },
            });
        } finally {
            setIsLoading(false);
        }
    };

    const setSettings = async (productId) => {
        setIsSetLoading(true);
        try {
            const token = await getSessionToken(app);
            const response = await axios.post(postUrl, {
                productId,
                presell: selected_upsell === "Specific_Products" || value === "custom" ? false : true
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            setSettingsObj(response?.data?.products);
            updateFormState(response?.data?.products);
            return response?.data?.products;
        } catch (err) {
            setError(err);
        } finally {
            setIsSetLoading(false);
        }
    };



    const clearError = () => {
        console.log("Clear");
        setSettingsObj([])
        updateFormState([])
    }

    return {
        settingsObj,
        setSettingsObj,
        isLoading,
        error,
        isSetLoading,
        setSettings,
        clearError,
    };
};
