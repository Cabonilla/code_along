import React, { useEffect, useState } from "react";
import mainInputStyles from '../../styles/MainInput.module.css';
import Timer from "./Timer";

const StopWatch = (props: any) => {
	const [isActive, setIsActive] = useState(true);
	const [isPaused, setIsPaused] = useState(true);
	const [time, setTime] = useState(0);

	React.useEffect(() => {
		let interval:any = null;

		if (isActive && isPaused === false) {
			interval = setInterval(() => {
				setTime((time) => time + 10);
			}, 10);
		} else {
			clearInterval(interval);
		}
		return () => {
			clearInterval(interval);
		};
	}, [isActive, isPaused]);

	
	useEffect(() => {
		if (props.nowTiming === true) {
			handleStart()
		} else {
			setIsPaused(true);
		}

		if (props.resetTiming === true) {
			handleReset()
		}
	}, [props.nowTiming, props.resetTiming])

	const handleStart = () => {
		setIsActive(true);
		setIsPaused(false);
	};

	const handlePauseResume = () => {
		setIsPaused(!isPaused);
	};

	const handleReset = () => {
		setIsActive(false);
		setTime(0);
	};

	if (!props.lockedInput) {
		props.setLockedInput(false);
	}

	return (
		<div className={mainInputStyles.stopWatch}>
			<Timer time={time} />
		</div>
	);
}

export default StopWatch;