import { faClipboard, faClock, faFloppyDisk, faGear, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import mainInputStyles from '../../styles/MainInput.module.css';

const SettingBar = (props: any) => {
	const [exampleSnippet, setExampleSnippet] = useState<string>(
	`def reverseList(head):
    prev = None
    curr = head
    
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
        
    return prev`)

	const saveCode = () => {
		if (props.storedInputs === null) {
			props.setStoredInputs([props.currInput])
		} else {
			props.setStoredInputs([...props.storedInputs, props.currInput])
		}
	}

	const exampleCode = () => {
		if (!props.lock) {
			props.setCurrInput(exampleSnippet)
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

	console.log(exampleSnippet)

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
							title="Paste Example"
						/>

						<FontAwesomeIcon
							className={
								props.settings
									? mainInputStyles.settingIcon
									: mainInputStyles.cogIcon
							}
							icon={faGear}
							onClick={() => settingInput()}
							title="Open Settings"
						/>
					</div>
					: <div className={mainInputStyles.icon_set}>
						<FontAwesomeIcon
							className={props.lock
								? mainInputStyles.lockIcon
								: mainInputStyles.unlockIcon}
							icon={props.lock ? faLock : faUnlock}
							onClick={() => lockInput()}
							title="Lock Input"
						/>


						<FontAwesomeIcon
							icon={faClock}
							className={props.timed
								? mainInputStyles.timingIcon
								: mainInputStyles.timeIcon}
							onClick={() => timeInput()}
							title="Enable Timer"
						/>

						<FontAwesomeIcon
							className={
								mainInputStyles.save
							}
							icon={faFloppyDisk}
							onClick={() => saveCode()}
							title="Save Snippet"
						/>

						<FontAwesomeIcon
							className={
								mainInputStyles.clipboard
							}
							icon={faClipboard}
							onClick={() => exampleCode()}
							data-tip="Example code."
							data-for="clipboard_tool"
							title="Paste Example"
						/>

						<FontAwesomeIcon
							className={
								props.settings
									? mainInputStyles.settingIcon
									: mainInputStyles.cogIcon
							}
							icon={faGear}
							onClick={() => settingInput()}
							title="Close Settings"
						/>
					</div>
			}
		</>
	)
}

export default SettingBar