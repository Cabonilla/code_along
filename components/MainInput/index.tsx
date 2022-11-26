import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Prism, { Grammar, highlight, languages } from 'prismjs';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-typescript';
// import 'prismjs/plugins/line-numbers/prism-line-numbers';
// import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/themes/prism.css';
import { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import useLocalStorageState from 'use-local-storage-state';
// import '../../assets/libraries_cpy/prism-line-numbers.js';
import mainInputStyles from '../../styles/MainInput.module.css';
import HelpModal from '../HelpModal/index';
// import LineNumbers from '../LineNumbers';
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
  const [fontSize, setFontSize] = useState<number>(14);

  const [currLanguage, setCurrLanguage] = useState<string>("python");
  const [correctChar, setCorrectChar] = useState<boolean>(true);

  const [nowTiming, setNowTiming] = useState<boolean>(false);
  const [resetTiming, setResetTiming] = useState<boolean>(false);

  const [lockedGrayscale, setLockedGrayscale] = useLocalStorageState('grayscale', {
    defaultValue: false
  })

  const [storedInputs, setStoredInputs] = useLocalStorageState('snippets', {
    defaultValue: []
  })

  const [storedTimes, setStoredTimes] = useLocalStorageState('times', {
    defaultValue: {}
  })

  const [transparentSlider, setTransparentSlider] = useState<number>(25)

  interface langType {
    [key: string]: Grammar;
  }

  const langObj: langType = {
    "python": languages.python,
    "javascript": languages.javascript,
    "css": languages.css,
    "typescript": languages.typescript,
    "sql": languages.sql,
  }

  let pickLanguage = (lang: string) => {
    if (langObj[lang]) {
      return langObj[lang]
    }
  }

  const newDate = new Date().toLocaleDateString('en-us',
    {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  // const newDate = 'Saturday, Nov 13, 2022'

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll();
    }
  }, [])

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

  const setCorrect = (original: string[], compared: string[]): void => {
    if (compareArrs(original, compared)) {
      setCorrectChar(true)
    } else {
      setCorrectChar(false);
    }
  }

  const compareArrs = (a: Array<string>, b: Array<string>) => {
    return a.every((char, idx) => char === b[idx])
  }

  const handleTime = async () => {
    let newTimeObj: any = {}

    let newTime = newDate
    let newVal: any;
    if ((storedTimes as any)[newDate] === undefined) {
      newVal = []
    } else {
      newVal = [...(storedTimes as any)[newDate]]
    }

    newTimeObj[`${newTime}`] = newVal
    setStoredTimes({ ...storedTimes, ...newTimeObj })
  }

  const compareCode = (code: string) => {
    setComparedInput(code);
    let lockedInputValue = lockedInput.replace(/[^\S\r\n\t]{4}/gi, "\t").split('')
    let comparedInputValue = code.replace(/[^\S\r\n\t]{4}/gi, "\t").split('')

    let comparedInputIndex = comparedInputValue.length - 1
    let slicedLocked = lockedInputValue.slice(0, comparedInputIndex + 1)

    if (lock && timed) {
      setResetTiming(false);

      if (slicedLocked.length > 0) {
        setNowTiming(true)
        handleTime();
        if (storedTimes === 1 || storedTimes === null || Object.keys(storedTimes).length === 0) {
          // handleTime();
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
          }
        }
      }

      if (slicedLocked.length === 0) {
        setResetTiming(true);
      }
    }

    if (JSON.stringify(lockedInputValue.slice(0, comparedInputValue.length)) == JSON.stringify(comparedInputValue)) {
      setCorrectChar(true);
    } else {
      setCorrectChar(false);
    }
  }

  return (
    <div className={mainInputStyles.textarea_container}>
      <h2>CodeAlong</h2>
      <div className={`${mainInputStyles.textarea_box} `}>
        {/* <LineNumbers
          currInput={currInput}
          currLanguage={currLanguage}
          fontSize={fontSize}
          setFontSize={setFontSize}
        /> */}
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
          currLanguage={currLanguage}
          setNowTiming={setNowTiming}
        />
        {!lock ? <Editor
          value={currInput}
          onValueChange={code => setCurrInput(code.replace(/[^\S\r\n\t]{4}/gi, "\t"))}
          // @ts-ignore
          highlight={code => highlight(code, pickLanguage(currLanguage), currLanguage)
            // .split("\n")
            // .map((line, i) => `<span class=${mainInputStyles.editorLineNumber}>${i + 1}</span>${line}`)
            // .join("\n")
          }
          tabSize={1}
          padding={10}
          insertSpaces={false}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: fontSize,
            maxHeight: '50vh',
            overflow: 'auto'
          }}
          textareaClassName={mainInputStyles.text_area}
          preClassName={mainInputStyles.pre_area}
          textareaId={mainInputStyles.text_area_id}
        /> : null}

        {lock ?
          <Editor
            value={lockedInput}
            onValueChange={code => setLockedInput(code)}
            // @ts-ignore
            highlight={code => highlight(code, pickLanguage(currLanguage), currLanguage)}
            tabSize={1}
            padding={10}
            insertSpaces={false}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: fontSize,
            }}
            textareaClassName={mainInputStyles.text_area_locked}
            preClassName={`${lockedGrayscale ? mainInputStyles.pre_area_locked : null} ${mainInputStyles.opacity_change}`}
            textareaId={mainInputStyles.text_area_id_locked}
          />
          : null}
        {lock ?
          <Editor
            value={comparedInput}
            onValueChange={code => compareCode(code)}
            // @ts-ignore
            highlight={code => highlight(code, pickLanguage(currLanguage), currLanguage)}
            tabSize={1}
            padding={10}
            autoFocus={true}
            insertSpaces={false}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: fontSize,
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
          setCurrLanguage={setCurrLanguage}
          langObj={langObj}
          lockedGrayscale={lockedGrayscale}
          setLockedGrayscale={setLockedGrayscale}
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