import { highlight, languages } from 'prismjs';
import Editor from 'react-simple-code-editor';
import mainInputStyles from '../../styles/MainInput.module.css';

const LineNumbers = (props: any) => {
	let lineNums = (props.currInput).split(/\n/).length

	let lineSet = Array.from(Array(lineNums).keys())

	return (
		<>
			<Editor
				value={lineSet.join('\n')}
				onValueChange={code => code}
				highlight={code => highlight(code, languages.python, props.currLanguage)}
				tabSize={4}
				padding={10}
				style={{
					fontFamily: '"Fira code", "Fira Mono", monospace',
					fontSize: 16,
					position: "absolute",
					left: "-2em",
					opacity: "25%",
				}}
				textareaClassName={mainInputStyles.line_numbers}
				preClassName={mainInputStyles.pre_line_numbers}
				textareaId={mainInputStyles.line_numbers_locked}
			/>
		</>
	)
}

export default LineNumbers