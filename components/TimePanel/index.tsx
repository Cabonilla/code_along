import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mainInputStyles from '../../styles/MainInput.module.css';
import Timer from '../StopWatch/Timer';

const TimePanel = (props: any) => {
	// console.log(props.storedTimes)
	// console.log(props.finalTime)
	const clearTimes = () => {
		props.storedTimes[props.newDate] = []
		props.setFinalTime(null)
	}

	return (
		<div className={mainInputStyles.time_panel}>
			<div className={mainInputStyles.time_panel_header}>
				<p>Saved Times</p>
				<FontAwesomeIcon style={{ 'width': '.75em' }} onClick={() => clearTimes()} icon={faTrash}></FontAwesomeIcon>
			</div>
			<>
				{props.storedTimes ? Object.entries(props.storedTimes).map(([key, val], i) => (
					<div key={i} className={mainInputStyles.timing_list}>
						<>
							<p>{key}</p>
							<ul>
								{props.storedTimes[key] !== [] ?
									(props.storedTimes[key]).map((listing: number, idx: number) => (
										<li key={idx}>
											<Timer time={listing} />
										</li>
									)) : null
								}
							</ul>
						</>
					</div>
				)) : null}
			</>
		</div>
	)
}

export default TimePanel