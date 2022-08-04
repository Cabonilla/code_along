import { faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mainInputStyles from '../../styles/MainInput.module.css';
import Timer from '../StopWatch/Timer';

const TimePanel = (props: any) => {
	// console.log(props.storedTimes)
	// console.log(props.finalTime)
	const clearTimes = () => {
		props.setStoredTimes({})
	}
	
	const clearDate = () => {
		props.storedTimes[props.newDate] = []
		props.setStoredTimes(props.storedTimes)
	}

	return (
		<div className={mainInputStyles.time_panel}>
			<div className={mainInputStyles.time_panel_header}>
				<p>Saved Times</p>
				<FontAwesomeIcon className={mainInputStyles.trash_icon} style={{ 'width': '.75em' }} onClick={() => clearTimes()} icon={faTrash} title="Clear Times"></FontAwesomeIcon>
			</div>
			<>
				{props.storedTimes ? Object.entries(props.storedTimes).map(([key, val], i) => (
					<div key={i} className={mainInputStyles.timing_list}>
						<div className={mainInputStyles.timing_entry}>
							<div className={mainInputStyles.date_entry}>
								<p>{key}</p>
								<FontAwesomeIcon className={mainInputStyles.clear_times} style={{ 'width': '.5em' }} onClick={() => clearDate()} icon={faXmark} title="Clear Date"></FontAwesomeIcon>
							</div>
							<ul>
								{
									(props.storedTimes[key]).map((listing: number, idx: number) => (
										<li key={idx}>
											<Timer time={listing} />
										</li>
									))
								}
							</ul>
						</div>
					</div>
				)) : null}
			</>
		</div>
	)
}

export default TimePanel