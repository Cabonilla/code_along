import React, { useRef, useState } from 'react';
import mainInputStyles from '../../styles/MainInput.module.css';

const MainInput = () => {
  const [textHeight, setTextHeight] = useState<number>(0);
  const [textWidth, setTextWidth] = useState<number>(40);
  const [currInput, setCurrInput] = useState<string>("")

  const textParams = useRef<HTMLTextAreaElement>(null)

  const expandingTextArea = (e: React.ChangeEvent<any>) => {
    const height = e.target.scrollHeight;
    const width = e.target.scrollWidth;

    console.log("Height: ", height)
    console.log("Width: ", width);

    const rowHeight = 15;
    const rowWidth = 7;

    const trows = Math.ceil(height / rowHeight);
    const tcols = Math.ceil(width / rowWidth) - 3;

    console.log("Rows: ", trows)
    console.log("Cols: ", tcols);

    if (trows != textHeight) {
      setTextHeight(trows);
    }

    if (tcols != textWidth) {
      setTextWidth(tcols);
    }

    const input = e.target.value
    setCurrInput(input)

    let currRows = input.split(/\r\n|\r|\n/).length
    let currCols = input.length - 3

    if (currRows <= 10) {
      setTextHeight(10);
    }

    if (currCols <= 40) {
      setTextWidth(40)
    }

    console.log(textParams.current!.style.width)
  }

  return (
    <div className={mainInputStyles.textarea_container}>
      <div className={mainInputStyles.textarea_box}>
        {/* <pre contentEditable={true} className={mainInputStyles.pre}>
          <code className={mainInputStyles.code_input}>
            {currInput}
          </code>
        </pre> */}
        <div className={mainInputStyles.text_display}></div>
        <textarea
          className={mainInputStyles.textarea_styling}
          placeholder="Enter code here."
          onChange={(e) => expandingTextArea(e)}
          rows={textHeight}
          cols={textWidth}
          value={currInput}
          wrap="off"
          ref={textParams}
        >
        </textarea>
      </div>
    </div>
  )
}

export default MainInput