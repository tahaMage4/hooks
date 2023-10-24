"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const useFetch = (url: string) => {
	const [data, setData] = useState<any[]>([]); //<never[]>
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);

	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await axios.get(url);
			setData(res.data);
		} catch (err: any) {
			Swal.fire({
				icon: "error",
				title: "Fetch Error",
				text: err,
				showClass: {
					popup: "animate__animated animate__fadeInDown",
				},
				hideClass: {
					popup: "animate__animated animate__fadeOutUp",
				},
			});
			setError(err);
		}
		setLoading(false);
	};
	useEffect(() => {
		fetchData();
	}, [url]);

	const reFetch = async () => {
		setLoading(true);
		try {
			const res = await axios.get(url);
			setData(res.data);
		} catch (err: any) {
			Swal.fire({
				icon: "error",
				title: "ReFetch Error",
				text: err,
				showClass: {
					popup: "animate__animated animate__fadeInDown",
				},
				hideClass: {
					popup: "animate__animated animate__fadeOutUp",
				},
			});
			setError(err);
		}
		setLoading(false);
	};

	return { data, loading, error, reFetch };
};

export default useFetch;
