import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css';
import { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import useLocalStorageState from 'use-local-storage-state';
import mainInputStyles from '../../styles/MainInput.module.css';
import HelpModal from '../HelpModal/index';
import SettingBar from '../SettingBar';
import '../SideBar/index';
import SideBar from '../SideBar/index';
import Stopwatch from '../StopWatch/index';
import TimePanel from '../TimePanel';

const MainInput = () => {
  const [currInput, setCurrInput] = useState<string>("")
  const [lockedInput, setLockedInput] = useState<string>("");
  const [comparedInput, setComparedInput] = useState<string>("")
  const [time, setTime] = useState(0);
  const [finalTime, setFinalTime] = useState<number>(0)
  const [lock, setLock] = useState<boolean>(false);
  const [timed, setTimed] = useState<boolean>(false);
  const [settings, setSettings] = useState<boolean>(false);
  const [help, setHelp] = useState<boolean>(false);

  const [currLanguage, setCurrLanguage] = useState<string>("python");
  const [correctChar, setCorrectChar] = useState<boolean>(true);

  const [nowTiming, setNowTiming] = useState<boolean>(false);
  const [resetTiming, setResetTiming] = useState<boolean>(false);

  const [storedInputs, setStoredInputs] = useLocalStorageState('snippets', {
    defaultValue: []
  })

  const [storedTimes, setStoredTimes] = useLocalStorageState('times', {
    defaultValue: {}
})

  const [transparentSlider, setTransparentSlider] = useState<number>(25)

  const newDate = new Date().toLocaleDateString('en-us',
    {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric"
    })

  // useEffect(() => {
  //   localStorage.setItem('snippets', JSON.stringify(storedInputs))
  // }, [storedInputs])

  // useEffect(() => {
  //   const data: any = localStorage.getItem("snippets")
  //   console.log("Stored Snippets: ", data);
  //   if (data !== undefined) {
  //     setStoredInputs(JSON.parse(data))
  //   }
  // }, [])

  // useEffect(() => {
  //   localStorage.setItem('times', JSON.stringify(storedTimes))
  // }, [finalTime])


  // useEffect(() => {
  //   const data: any = localStorage.getItem("times")
  //   console.log("Stored Times: ", data);
  //   if (data !== undefined) {
  //     setStoredTimes(JSON.parse(data))
  //   }
  // }, [])

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

  const compareArrs = (a: Array<string>, b: Array<string>) => {
    return a.every((char, idx) => char === b[idx])
  }

  const handleTime = async () => {
    let newTimeObj: any = {}

    let newTime = newDate
    let newVal: any = []

    newTimeObj[`${newTime}`] = newVal
    setStoredTimes({ ...storedTimes, ...newTimeObj })
  }

  // console.log("StoredTimes[newDate]: ", storedTimes[newDate]);
  // console.log("StoredTimes: ", storedTimes);

  // console.log(Object.keys(storedTimes).length)

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
        if (storedTimes === 1 || storedTimes === null || Object.keys(storedTimes).length === 0) {
          handleTime();
        }

        if (
          slicedLocked.length === lockedInputValue.length
          && correctChar
        ) {
          setNowTiming(false)

          if ((storedTimes as any)[newDate]) {
            (storedTimes as any)[newDate].push(time)
            setStoredTimes(storedTimes)
            setFinalTime(time);
            console.log("Hello.")
          }
        }
      }

      if (slicedLocked.length === 0) {
        setResetTiming(true);
      }
    }

    setCorrect(slicedLocked, comparedInputValue);
  }

  // console.log(storedTimes)

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
        <SettingBar
          currInput={currInput}
          storedInputs={storedInputs}
          setStoredInputs={setStoredInputs}
          timed={timed}
          setTime={setTime}
          lock={lock}
          setLock={setLock}
          setComparedInput={setComparedInput}
          setTimed={setTimed}
          setSettings={setSettings}
          settings={settings}
          setLockedInput={setLockedInput}
          setCurrInput={setCurrInput}
        />
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
      {help ? <HelpModal
        help={help}
        setHelp={setHelp}
      /> : null}
      <div className={mainInputStyles.help_button} onClick={() => setHelp(!help)}>
        <FontAwesomeIcon icon={faQuestion} className={mainInputStyles.question_mark}></FontAwesomeIcon>
      </div>
    </div>
  )
}

export default MainInput