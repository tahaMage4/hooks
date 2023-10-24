"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";

export interface FormValues {
	[key: string]: string | boolean | number | object | any;
}

export interface ValidationErrors {
	[key: string]: string;
}

interface UseCustomFormProps {
	initialValues: FormValues;
	onSubmit: () => Promise<void>;
	validateForm: (data: FormValues) => ValidationErrors;
}

const useCustomForm = ({
	initialValues,
	onSubmit,
	validateForm,
}: UseCustomFormProps) => {
	// State to hold form data
	const [formData, setFormData] = useState<FormValues>(initialValues);

	// State to handle form submission status
	const [isSubmitting, setSubmitting] = useState<boolean>(false);

	// State to handle form validation errors (if required)
	const [errors, setErrors] = useState<ValidationErrors>({});

	// Form submission handler
	const handleFormSubmit = async (e: FormEvent<EventTarget>) => {
		e.preventDefault();
		// Perform form validation if needed
		let validationErrors = validateForm(formData);
		setErrors(validationErrors);

		// If there are no validation errors, proceed with form submission
		if (
			Object.keys(validationErrors).length === 0
			// || Array.keys(validationErrors).length === 0
		) {
			try {
				setSubmitting(true);
				await onSubmit(); //formData
				setSubmitting(false);
			} catch (error: any) {
				// Handle any submission errors
				setSubmitting(false);
				Swal.fire({
					icon: "error",
					title: "Error submitting form:",
					text: error.message,
				});
			}
			// error  }
		}
	};

	// Form input change handler
	const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleFormChecked = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.checked,
		}));
	};

	const handleFormRadio = (value: FormValues) => {
		setFormData(value);
	};

	return {
		formData,
		isSubmitting,
		errors,
		handleFormSubmit,
		handleFormChange,
		handleFormChecked,
		handleFormRadio,
		setFormData,
	};
};

export default useCustomForm;
