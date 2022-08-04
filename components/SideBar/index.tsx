import { faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import mainInputStyles from '../../styles/MainInput.module.css';

const SideBar = (props: any) => {
	const [currHover, setCurrHover] = useState<string>("")

	const localReplace = async (selection: any) => {
		props.setCurrInput(currHover);
		props.setTimed(false);
		props.setLock(false);
	}

	const clearLocal = () => {
		localStorage.removeItem("snippets")
		props.setStoredInputs([])
	}

	const hoverSelection = async (e: any) => {
		let selection = e.target.childNodes[0].innerText
		if (selection !== undefined) {
			setCurrHover(selection.toString())
		}
	}

	const removeListing = (index: any) => {
		props.setStoredInputs((props.storedInputs).filter((o: any, i: any) => index !== i))
	}

	return (
		<div className={mainInputStyles.sidebar}>
			<div className={mainInputStyles.saved_snippets}>
				<div className={mainInputStyles.sidebar_header}>
					<p>Saved Snippets</p>
					<FontAwesomeIcon style={{ 'width': '.75em' }} onClick={() => clearLocal()} title="Clear Listings" icon={faTrash}></FontAwesomeIcon>
				</div>
				<div className={mainInputStyles.snippet_box}>
					{Object.keys(props.storedInputs || {}).map((key: string, idx: number) => {
						return (
							<div key={idx} className={mainInputStyles.snippet_listing} title="Paste Listing">
								<pre
									className={mainInputStyles.saved_snippet}
									onClick={(e) => localReplace(e)}
									onMouseEnter={(e) => hoverSelection(e)}
								>
									<code
									>
										{props.storedInputs[key]}
									</code>
								</pre>
								<FontAwesomeIcon icon={faXmark} title="Remove Listing" className={mainInputStyles.snippet_delete} onClick={() => removeListing(idx)} />
							</div>
						)
					})}
				</div>
			</div>
			<div className={mainInputStyles.slider_box}>
				<label htmlFor="slider">Locked Opacity</label>
				<input
					className={mainInputStyles.slider}
					id={mainInputStyles.slider}
					type="range"
					min="0"
					max="100"
					defaultValue="25"
					onChange={(e) => props.setTransparentSlider(Number(e.target.value))}
					step="25"
				>
				</input>
			</div>
		</div>
	)
}

export default SideBar