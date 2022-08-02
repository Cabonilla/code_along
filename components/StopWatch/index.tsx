import React, { useEffect, useState } from "react";
import mainInputStyles from '../../styles/MainInput.module.css';
import Timer from "./Timer";

const StopWatch = (props: any) => {
	const [isActive, setIsActive] = useState(true);
	const [isPaused, setIsPaused] = useState(true);

	React.useEffect(() => {
		let interval: any = null;

		if (isActive && isPaused === false) {
			interval = setInterval(() => {
				props.setTime((time: any) => time + 10);
			}, 10);
		} else {
			clearInterval(interval);
		}
		return () => {
			clearInterval(interval);
		};
	}, [isActive, isPaused, props]);


	useEffect(() => {
		if (props.nowTiming === true) {
			handleStart()
		} else {
			setIsPaused(true);
		}

		if (props.resetTiming === true) {
			const handleReset = () => {
				setIsActive(false);
				props.setTime(0);
			};
			handleReset()
		}
	}, [props.nowTiming, props.resetTiming, props])

	const handleStart = () => {
		setIsActive(true);
		setIsPaused(false);
	};

	const handlePauseResume = () => {
		setIsPaused(!isPaused);
	};

	if (!props.lockedInput) {
		props.setLockedInput(false);
	}

	return (
		<div className={mainInputStyles.stopWatch}>
			<Timer time={props.time} />
		</div>
	);
}

export default StopWatch;