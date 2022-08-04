import { faClipboard, faClock, faFloppyDisk, faGear, faLock, faTrash, faUnlock, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mainInputStyles from '../../styles/MainInput.module.css';

const HelpModal = (props: any) => {
	const exitHelp = () => {
		props.setHelp(false)
	}

	interface listingType {
		[key: string]: {
			Explanation: string,
			Icon: any
		}
	}

	const helpListings: listingType = {
		Paste: {
			Explanation: "Paste some example code.",
			Icon: faClipboard
		},
		Settings: {
			Explanation: "Open settings tabs.",
			Icon: faGear
		},
		Lock: {
			Explanation: "Locks input in place.",
			Icon: faLock
		},
		Unlock: {
			Explanation: "Unlocks input.",
			Icon: faUnlock
		},
		Time: {
			Explanation: "Times correct input.",
			Icon: faClock
		},
		Save: {
			Explanation: "Save input into storage.",
			Icon: faFloppyDisk
		},
		Trash: {
			Explanation: "Resets saved listings.",
			Icon: faTrash
		},
		Delete: {
			Explanation: "Deletes listing.",
			Icon: faXmark
		}
	}

	return (
		<div className={mainInputStyles.modal_container}>
			<div className={mainInputStyles.modal}>
				<>
					<p className={mainInputStyles.help_header}>Help</p>
					{
						Object.keys(helpListings).map((key: any, idx) => {
							return (<>
								<div className={mainInputStyles.modal_listing} key={idx}>
									<p className={mainInputStyles.help_listing_title}>{key}</p>
									<p>{helpListings[key]["Explanation"]}</p>
									<FontAwesomeIcon className={mainInputStyles.help_listing_icon} icon={helpListings[key]["Icon"]}/>
								</div>
								<hr />
							</>)
						})
					}
				</>
			</div>
			<div className={mainInputStyles.modal_background} onClick={() => exitHelp()}>
			</div>
		</div>
	)
}

export default HelpModal