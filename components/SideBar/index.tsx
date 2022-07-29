import { faEraser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import mainInputStyles from '../../styles/MainInput.module.css';

const SideBar = (props: any) => {
	const [ currHover, setCurrHover ] = useState<string>("")

	// useEffect(() => {
	// 	let snippetValues = localStorage.getItem("snippets")
	// 	console.log(snippetValues)
	// }, [])
	// console.log(props);

	// console.log(Object.keys(props))

	const localReplace = async (selection: any) => {
		// let snippet = selection.target.childNodes[0].innerText
		// if (snippet != undefined && snippet !== null) {
		// 	props.setCurrInput(snippet.toString())			
		// }

		props.setCurrInput(currHover);
	}

	const clearLocal = () => {
		localStorage.removeItem("snippets")
		props.setStoredInputs([])
	}

	const diag = async (e: any) => {
		let selection = e.target.childNodes[0].innerText
		if (selection !== undefined) {
			setCurrHover(selection.toString())
		}
	}

	// console.log(currHover);
	
	return (
		<div className={mainInputStyles.sidebar}>
			<div className={mainInputStyles.saved_snippets}>
				<div className={mainInputStyles.sidebar_header}>
					<p>Saved Snippets</p>
					<FontAwesomeIcon onClick={() => clearLocal()} icon={faEraser}></FontAwesomeIcon>
				</div>
				<div className={mainInputStyles.snippet_box}>
					{Object.keys(props.storedInputs || {}).map((key: string, idx: number) => {
						return (
							<pre
								key={key}
								className={mainInputStyles.saved_snippet}
								onClick={(e) => localReplace(e)}
								onMouseEnter = {(e) => diag(e)}
							>
								<code key={key}>
									{props.storedInputs[key]}
								</code>
							</pre>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default SideBar