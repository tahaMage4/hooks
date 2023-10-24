"use client";
import { useEffect, useState } from "react";

const useDevice = () => {
	const [isMobile, setMobile] = useState<boolean>(false);
	const [isDesktop, setDesktop] = useState<boolean>(false);

	const userAgent =
		// typeof window.navigator === "undefined" ? "" : navigator.userAgent;
		typeof window !== "undefined" && window.navigator
			? window.navigator.userAgent
			: "";
	const Mobile = () => {
		const mobile = Boolean(
			userAgent.match(
				/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
			)
		);
		setMobile(mobile);
	};

	const Desktop = () => {
		const desktop = !Boolean(
			userAgent.match(
				/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
			)
		);
		setDesktop(desktop);
	};

	useEffect(() => {
		Mobile();
		Desktop();
	}, []);

	return [isMobile, isDesktop];
};

export default useDevice;
