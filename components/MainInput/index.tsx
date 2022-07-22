import { faClipboard, faClock, faGear, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css';
import { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import mainInputStyles from '../../styles/MainInput.module.css';
import Stopwatch from '../StopWatch/StopWatch';

const MainInput = () => {
  const [currInput, setCurrInput] = useState<string>("")
  const [lockedInput, setLockedInput] = useState<string>("");
  const [comparedInput, setComparedInput] = useState<string>("")
  const [lock, setLock] = useState<boolean>(false);
  const [timed, setTimed] = useState<boolean>(false);
  const [settings, setSettings] = useState<boolean>(false);
  const [currLanguage, setCurrLanguage] = useState<string>("python");
  const [correctChar, setCorrectChar] = useState<boolean>(true);

  const [nowTiming, setNowTiming] = useState<boolean>(false);
  const [resetTiming, setResetTiming] = useState<boolean>(false);

  useEffect(() => {
    let placeholderText = document.querySelector(`.${mainInputStyles.text_area}`)
    if (placeholderText) {
      placeholderText.setAttribute("placeholder", "Enter your code here.")
    }
  }, [lock])

  const exampleCode = () => {
    !lock ?
      setCurrInput(
        `def binary_search(lst, target):
    start = 0
    end = len(lst) - 1
    while(start <= end):
        mid = (start + end) // 2
        if(lst[mid] > target):
            end = mid - 1
        elif(lst[mid] < target):
            start = mid + 1
        else:
            return mid
    return None`)
      : null
  }


  const compareArrs = (a: Array<string>, b: Array<string>) => {
    return a.every((char, idx) => char === b[idx])
  }

  const compareCode = (code: string) => {
    setComparedInput(code);
    let lockedInputValue = lockedInput.split('')
    let comparedInputValue = code.split('')
    console.log("lockedLength: ", lockedInputValue.length)

    let comparedInputIndex = comparedInputValue.length - 1
    let slicedLocked = lockedInputValue.slice(0, comparedInputIndex + 1)
    // console.log(comparedInputValue)
    // console.log(comparedInputIndex)
    console.log("slicedLockLength: ", slicedLocked.length)

    if (lock && timed) {
      setResetTiming(false);

      if (slicedLocked.length > 0) {
        setNowTiming(true)

        if (slicedLocked.length === lockedInputValue.length) {
          setNowTiming(false)
        }
      } 

      if (slicedLocked.length === 0) {
        setResetTiming(true);
      }
    }

    if (compareArrs(slicedLocked, comparedInputValue)) {
      setCorrectChar(true)
    } else {
      setCorrectChar(false);
    }
  }

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
    setLock(true);

    if (!lock) {
      setLockedInput(currInput);
      setComparedInput('');
    }
  }

  const settingInput = () => {
    setSettings(!settings)
  }

  return (
    <div className={mainInputStyles.textarea_container}>
      <h2>CodeAlong</h2>
      <div className={mainInputStyles.textarea_box}>
        {timed
          ? <Stopwatch
            nowTiming={nowTiming}
            resetTiming={resetTiming}
          />
          : null
        }
        {
          currInput.length === 0
            ? null
            : <div className={mainInputStyles.icon_set}>
              <FontAwesomeIcon
                className={
                  mainInputStyles.clipboard
                }
                icon={faClipboard}
                onClick={() => exampleCode()}
                data-tip="Example code."
                data-for="clipboard_tool"
              />

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
                className={timed
                  ? mainInputStyles.timingIcon
                  : mainInputStyles.timeIcon}
                onClick={() => timeInput()}
              />
              <FontAwesomeIcon
                className={lock
                  ? mainInputStyles.lockIcon
                  : mainInputStyles.unlockIcon}
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