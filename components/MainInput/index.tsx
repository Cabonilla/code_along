import { faClock, faGear, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css';
import { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import mainInputStyles from '../../styles/MainInput.module.css';

const MainInput = () => {
  const [currInput, setCurrInput] = useState<string>("")
  const [lockedInput, setLockedInput] = useState<string>("");
  const [comparedInput, setComparedInput] = useState<string>("")
  const [lock, setLock] = useState<boolean>(false);
  const [timed, setTimed] = useState<boolean>(false);
  const [settings, setSettings] = useState<boolean>(false);
  const [currLanguage, setCurrLanguage] = useState<string>("python");
  const [correctChar, setCorrectChar] = useState<boolean>(true);

  const [startTime, setStartTime] = useState<number>(0)
  const [endTime, setEndTime] = useState<number>(0)

  useEffect(() => {
    let placeholderText = document.querySelector(".npm__react-simple-code-editor__textarea")!
    placeholderText.setAttribute("placeholder", "Enter your code here.")
  }, [lock])

  const lockInput = () => {

    setLock(!lock);

    if (!lock) {
      setLockedInput(currInput);
      setComparedInput('');
    }

    // console.log(lockInput);
  }

  const timeInput = () => {
    setTimed(!timed);
  }

  const settingInput = () => {
    setSettings(!settings)
  }

  const compareArrs = (a: Array<string>, b: Array<string>) => {
    if (a.every((char, idx) => char === b[idx])) {
      return true
    } else {
      return false
    }
  }

  const compareCode = (code: string) => {
    setComparedInput(code);
    let lockedInputValue = lockedInput.split('')
    let comparedInputValue = code.split('')
    console.log(lockedInputValue.length)

    let comparedInputIndex = comparedInputValue.length - 1
    let slicedLocked = lockedInputValue.slice(0, comparedInputIndex + 1)
    // console.log(comparedInputValue)
    // console.log(comparedInputIndex)
    console.log(slicedLocked.length)

    if (compareArrs(slicedLocked, comparedInputValue)) {
      setCorrectChar(true)
    } else {
      setCorrectChar(false);
    }
  }

  return (
    <div className={mainInputStyles.textarea_container}>
      <h2>CodeAlong</h2>
      <div className={mainInputStyles.textarea_box}>
        {
          currInput.length === 0
            ? null
            : <div className={mainInputStyles.icon_set}>
              <FontAwesomeIcon
                className={
                  // settings 
                  // ? mainInputStyles.settingIcon 
                  // : mainInputStyles.cogIcon
                  mainInputStyles.cogIcon 
                }
                icon={faGear}
                onClick={() => settingInput()}
              />

              <FontAwesomeIcon
                icon={faClock}
                className={timed ? mainInputStyles.timingIcon : mainInputStyles.timeIcon}
                onClick={() => timeInput()}
              />
              <FontAwesomeIcon
                className={lock ? mainInputStyles.lockIcon : mainInputStyles.unlockIcon}
                icon={lock ? faLock : faUnlock}
                onClick={() => lockInput()}
              />
            </div>
        }
        {!lock ? <Editor
          value={currInput}
          onValueChange={code => setCurrInput(code)}
          highlight={code => highlight(code, languages.python, currLanguage)}
          tabSize={4}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 16,
          }}
          textareaClassName={mainInputStyles.text_area}
          preClassName={mainInputStyles.pre_area}
          textareaId={mainInputStyles.text_area_id}
        /> : null}

        {lock ?
          <Editor
            value={lockedInput}
            onValueChange={code => setLockedInput(code)}
            highlight={code => highlight(code, languages.python, currLanguage)}
            tabSize={4}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              // position: 'absolute',
              // top: 0,
              // zIndex: -1,
            }}
            textareaClassName={mainInputStyles.text_area_locked}
            preClassName={mainInputStyles.pre_area_locked}
            textareaId={mainInputStyles.text_area_id_locked}
          />
          : null}
        {lock ?
          <Editor
            value={comparedInput}
            onValueChange={code => compareCode(code)}
            highlight={code => highlight(code, languages.python, currLanguage)}
            tabSize={4}
            padding={10}
            autoFocus={true}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              position: 'absolute',
              top: 0,
              // zIndex: -1,
            }}
            textareaClassName={mainInputStyles.text_area_compared}
            preClassName={
              correctChar
                ? mainInputStyles.pre_area_compared_correct
                : mainInputStyles.pre_area_compared_incorrect
            }
            textareaId={mainInputStyles.text_area_id_compared}
          />
          : null}
      </div>
    </div>
  )
}

export default MainInput