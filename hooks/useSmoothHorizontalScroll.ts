"use client";
import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

interface UseSmoothHorizontalScroll {
	scrollContainerRef: RefObject<HTMLElement> | any;
	handleScroll: () => void;
	// scrollTo: (shift: number) => void;
	scrollTo: (shiftX: number, shiftY: number) => void;
	// isAtStart: boolean;
	// isAtEnd: boolean;
	isAtStartX: boolean;
	isAtEndX: boolean;
	isAtStartY: boolean;
	isAtEndY: boolean;
}

/**
 * It returns an object with a ref to the scroll container, a function to handle scroll events, a
 * function to scroll to a certain position, and booleans to indicate whether the scroll container is
 * at the start or end
 * @returns An object with the following properties:
 * - scrollContainerRef: A ref to the scroll container
 * - handleScroll: A function that updates the isAtStart and isAtEnd state
 * - scrollTo: A function that scrolls the container by a given amount
 * - isAtStart: A boolean indicating whether the container is scrolled to the start
 * - isAtEnd: A boolean indicating whether
 */
const useSmoothHorizontalScroll = (): UseSmoothHorizontalScroll => {
	const scrollContainerRef = useRef<HTMLElement>(null);
	// const [isAtStart, setIsAtStart] = useState<boolean>(true);
	// const [isAtEnd, setIsAtEnd] = useState<boolean>(false);
	const [isAtStartX, setIsAtStartX] = useState<boolean>(true);
	const [isAtEndX, setIsAtEndX] = useState<boolean>(false);
	const [isAtStartY, setIsAtStartY] = useState<boolean>(true);
	const [isAtEndY, setIsAtEndY] = useState<boolean>(false);

	useEffect(() => {
		if (!scrollContainerRef.current) return;
		// setIsAtEnd(
		// 	scrollContainerRef.current.scrollWidth ===
		// 		scrollContainerRef.current.offsetWidth
		// );
		const container = scrollContainerRef?.current;
		setIsAtEndX(
			container.scrollWidth === container?.offsetWidth + container.scrollLeft
		);
		setIsAtEndY(
			container.scrollHeight === container?.offsetHeight + container.scrollTop
		);
	}, [scrollContainerRef]);

	const handleScroll = () => {
		if (!scrollContainerRef.current) return;

		// setIsAtStart(scrollContainerRef.current?.scrollLeft === 0);
		// setIsAtEnd(
		// 	Math.floor(
		// 		scrollContainerRef.current?.scrollWidth -
		// 			scrollContainerRef.current?.scrollLeft
		// 	) <= scrollContainerRef.current?.offsetWidth
		// );
		const container = scrollContainerRef.current;
		setIsAtStartX(container.scrollLeft === 0);
		setIsAtEndX(
			Math.floor(container?.scrollWidth - container?.scrollLeft) <=
				container?.offsetWidth
		);
		// container.scrollWidth === container.offsetWidth + container.scrollLeft

		setIsAtStartY(container.scrollTop === 0);
		setIsAtEndY(
			// container.scrollHeight === container.offsetHeight + container.scrollTop
			Math.floor(container?.scrollHeight + container.scrollTop) <=
				container.offsetHeight
		);
	};

	// shift: number;
	const scrollTo = (shiftX: number, shiftY: number) => {
		scrollContainerRef.current?.scrollTo({
			// left: scrollContainerRef.current?.scrollLeft + shift,
			left: scrollContainerRef.current?.scrollLeft + shiftX,
			top: scrollContainerRef.current?.scrollTop + shiftY,
			behavior: "smooth",
		});
	};

	return {
		scrollContainerRef,
		handleScroll,
		scrollTo,
		// isAtStart,
		// isAtEnd,
		isAtStartX,
		isAtEndX,
		isAtStartY,
		isAtEndY,
	};
};

export default useSmoothHorizontalScroll;
