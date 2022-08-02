import { faClipboard, faClock, faFloppyDisk, faGear, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css';
import { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import mainInputStyles from '../../styles/MainInput.module.css';
import '../SideBar/index';
import SideBar from '../SideBar/index';
import Stopwatch from '../StopWatch/index';
import TimePanel from '../TimePanel';

const MainInput = () => {
  const [currInput, setCurrInput] = useState<string>("")
  const [lockedInput, setLockedInput] = useState<string>("");
  const [comparedInput, setComparedInput] = useState<string>("")
  const [lock, setLock] = useState<boolean>(false);
  const [timed, setTimed] = useState<boolean>(false);
  const [time, setTime] = useState(0);
  const [finalTime, setFinalTime] = useState<number>(0)
  const [settings, setSettings] = useState<boolean>(false);

  const [currLanguage, setCurrLanguage] = useState<string>("python");
  const [correctChar, setCorrectChar] = useState<boolean>(true);

  const [nowTiming, setNowTiming] = useState<boolean>(false);
  const [resetTiming, setResetTiming] = useState<boolean>(false);

  const [storedInputs, setStoredInputs] = useState<any>([])
  const [storedTimes, setStoredTimes] = useState<any>({})

  const [transparentSlider, setTransparentSlider] = useState<number>(25)

  const newDate = new Date().toLocaleDateString('en-us',
    {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric"
    })

  useEffect(() => {
    const data: any = localStorage.getItem("snippets")
    // console.log("Stored Data: ", data);
    if (data !== undefined) {
      setStoredInputs(JSON.parse(data))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('snippets', JSON.stringify(storedInputs))
  }, [storedInputs])

  useEffect(() => {
    const data: any = localStorage.getItem("times")
    // console.log("Stored Data: ", data);
    if (data !== undefined) {
      setStoredTimes(JSON.parse(data))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('times', JSON.stringify(storedTimes))
  }, [finalTime])

  // console.log(storedTimes);

  useEffect(() => {
    let placeholderText = document.querySelector(`.${mainInputStyles.text_area}`)
    if (placeholderText) {
      placeholderText.setAttribute("placeholder", "Enter your code here.")
    }
  }, [lock])

  useEffect(() => {
    let comparedText = document.querySelector(`.${mainInputStyles.text_area_compared}`)
    comparedText?.setAttribute("maxlength", `${lockedInput.length}`)
  }, [lockedInput])

  useEffect(() => {
    if (lockedInput.length === comparedInput.length) {
      if (lockedInput !== comparedInput) {
        setNowTiming(true)
      }
    }
  }, [lockedInput, comparedInput])

  useEffect(() => {
    const transparency = document.querySelector<HTMLElement>(`.${mainInputStyles.opacity_change}`);
    if (transparency) {
      transparency.style.opacity = `${transparentSlider}%`;
    }
  }, [transparentSlider])

  // console.log(transparentSlider)

  const setCorrect = (original: string[], compared: string[]) => {
    if (compareArrs(original, compared)) {
      setCorrectChar((prev) => prev = true)
    } else {
      setCorrectChar((prev) => prev = false);
    }
  }

  const saveCode = () => {
    if (storedInputs === null) {
      setStoredInputs([currInput])
    } else {
      setStoredInputs([...storedInputs, currInput])
    }
  }

  const compareArrs = (a: Array<string>, b: Array<string>) => {
    return a.every((char, idx) => char === b[idx])
  }

  const handleTime = async () => {
    let newTimeObj: any = {}

    let newTime = newDate
    let newVal: any = []

    newTimeObj[newTime] = newVal
    setStoredTimes({ ...storedTimes, ...newTimeObj })
  }

  // console.log("StoredTimes[newDate]: ", storedTimes[newDate]);
  // console.log("StoredTimes: ", storedTimes);

  const compareCode = (code: string) => {
    setComparedInput(code);
    let lockedInputValue = lockedInput.split('')
    let comparedInputValue = code.split('')

    let comparedInputIndex = comparedInputValue.length - 1
    let slicedLocked = lockedInputValue.slice(0, comparedInputIndex + 1)

    if (lock && timed) {
      setResetTiming(false);

      if (slicedLocked.length > 0) {
        setNowTiming(true)
        if (storedTimes === 1 || storedTimes === null || Object.keys.length === 0) {
          handleTime();
        }

        if (
          slicedLocked.length === lockedInputValue.length
          && correctChar
        ) {
          setNowTiming(false)

          if (storedTimes[newDate]) {
            storedTimes[newDate].push(time)
            setFinalTime(time);
          }
        }
      }

      if (slicedLocked.length === 0) {
        setResetTiming(true);
      }
    }

    setCorrect(slicedLocked, comparedInputValue);
  }

  const exampleCode = () => {
    if (!lock) {
      setCurrInput((prev) => prev =
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
      setLock(false);
    }
  }

  const lockInput = () => {

    setLock(!lock);

    if (!lock) {
      setLockedInput(currInput);
      setComparedInput('');
    }
  }

  const timeInput = () => {
    setTimed(!timed);
    setLockedInput(currInput);
    setComparedInput('');
    setLock(true);

    lock ? null : setLock(true)
  }

  const settingInput = () => {
    setSettings(!settings)
  }

  console.log(storedTimes)

  return (
    <div className={mainInputStyles.textarea_container}>
      <h2>CodeAlong</h2>
      <div className={mainInputStyles.textarea_box}>
        {timed
          ? <Stopwatch
            nowTiming={nowTiming}
            resetTiming={resetTiming}
            lockedInput={lockedInput}
            setLockedInput={setLockedInput}
            time={time}
            setTime={setTime}
          />
          : null
        }
        {
          currInput.length === 0
            ? <div className={mainInputStyles.icon_set}>
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
                  settings
                    ? mainInputStyles.settingIcon
                    : mainInputStyles.cogIcon
                }
                icon={faGear}
                onClick={() => settingInput()}
              />
            </div>
            : <div className={mainInputStyles.icon_set}>
              <FontAwesomeIcon
                className={lock
                  ? mainInputStyles.lockIcon
                  : mainInputStyles.unlockIcon}
                icon={lock ? faLock : faUnlock}
                onClick={() => lockInput()}
              />


              <FontAwesomeIcon
                icon={faClock}
                className={timed
                  ? mainInputStyles.timingIcon
                  : mainInputStyles.timeIcon}
                onClick={() => timeInput()}
              />

              <FontAwesomeIcon
                className={
                  mainInputStyles.save
                }
                icon={faFloppyDisk}
                onClick={() => saveCode()}
              />

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
                  settings
                    ? mainInputStyles.settingIcon
                    : mainInputStyles.cogIcon
                }
                icon={faGear}
                onClick={() => settingInput()}
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
            preClassName={`${mainInputStyles.pre_area_locked} ${mainInputStyles.opacity_change}`}
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
      {settings
        ? <SideBar
          storedInputs={storedInputs}
          setStoredInputs={setStoredInputs}
          setCurrInput={setCurrInput}
          currInput={currInput}
          setTimed={setTimed}
          setLock={setLock}
          transparentSlider={transparentSlider}
          setTransparentSlider={setTransparentSlider}
        />
        : null
      }
      {settings
        ? <TimePanel
          storedTimes={storedTimes}
          setStoredTimes={setStoredTimes}
          newDate={newDate}
          setFinalTime={setFinalTime}
        />
        : null
      }
    </div>
  )
}

export default MainInput