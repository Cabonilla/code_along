import { faClipboard, faClock, faFloppyDisk, faGear, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mainInputStyles from '../../styles/MainInput.module.css';

const SettingBar = (props: any) => {
	const saveCode = () => {
		if (props.storedInputs === null) {
			props.setStoredInputs([props.currInput])
		} else {
			props.setStoredInputs([...props.storedInputs, props.currInput])
		}
	}

	const exampleCode = () => {
		if (!props.lock) {
			props.setCurrInput((prev: any) => prev =
				`def binary_search(lst, target):
		start = 0
		end = len(lst) - 1
		while(start <= end):
			mid = (start + end) // 2
			if(lst[mid] > target):
				end = mid - 1
			elif(lst[mid] < target):
				start = mid + 1
			else:
				return mid
		return None`)
			props.setLock(false);
		}
	}

	const lockInput = () => {
		props.setLock(!props.lock);

		if (!props.lock) {
			props.setLockedInput(props.currInput);
			props.setComparedInput('');
		}
	}

	const timeInput = () => {
		props.setTimed(!props.timed);
		props.setLockedInput(props.currInput);
		props.setComparedInput('');
		props.setLock(true);

		props.lock ? null : props.setLock(true)
	}

	const settingInput = () => {
		props.setSettings(!props.settings)
	}

	return (
		<>
			{
				props.currInput.length === 0
					? <div className={mainInputStyles.icon_set}>
						<FontAwesomeIcon
							className={
								mainInputStyles.clipboard
							}
							icon={faClipboard}
							onClick={() => exampleCode()}
							data-tip="Example code."
							data-for="clipboard_tool"
						/>

						<FontAwesomeIcon
							className={
								props.settings
									? mainInputStyles.settingIcon
									: mainInputStyles.cogIcon
							}
							icon={faGear}
							onClick={() => settingInput()}
						/>
					</div>
					: <div className={mainInputStyles.icon_set}>
						<FontAwesomeIcon
							className={props.lock
								? mainInputStyles.lockIcon
								: mainInputStyles.unlockIcon}
							icon={props.lock ? faLock : faUnlock}
							onClick={() => lockInput()}
						/>


						<FontAwesomeIcon
							icon={faClock}
							className={props.timed
								? mainInputStyles.timingIcon
								: mainInputStyles.timeIcon}
							onClick={() => timeInput()}
						/>

						<FontAwesomeIcon
							className={
								mainInputStyles.save
							}
							icon={faFloppyDisk}
							onClick={() => saveCode()}
						/>

						<FontAwesomeIcon
							className={
								mainInputStyles.clipboard
							}
							icon={faClipboard}
							onClick={() => exampleCode()}
							data-tip="Example code."
							data-for="clipboard_tool"
						/>

						<FontAwesomeIcon
							className={
								props.settings
									? mainInputStyles.settingIcon
									: mainInputStyles.cogIcon
							}
							icon={faGear}
							onClick={() => settingInput()}
						/>
					</div>
			}
		</>
	)
}

export default SettingBar