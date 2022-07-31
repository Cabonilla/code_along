import mainInputStyles from '../../styles/MainInput.module.css';

const TimePanel = (props: any) => {
	const newDate = new Date().toLocaleDateString('en-us', 
		{ 
			weekday:"long", 
			year:"numeric", 
			month:"short", 
			day:"numeric"
		}) 
	console.log(newDate)

	return (
		<div className={mainInputStyles.time_panel}>
			<div className={mainInputStyles.time_panel_header} >
				<p>Saved Times</p>
			</div>
		</div>
	)
}

export default TimePanel