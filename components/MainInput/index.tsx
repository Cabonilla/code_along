import { faClock, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
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

  useEffect(() => {
    let placeholderText = document.querySelector(".npm__react-simple-code-editor__textarea")!
    placeholderText.setAttribute("placeholder", "Enter your code here.")
  }, [])

  const lockInput = () => {

    setLock(!lock);

    if (!lock) {
      setLockedInput(currInput);
    }

    console.log(lockInput);
  }

  const timeInput = () => {
    setTimed(!timed);
  }

  // console.log(lockedInput.split(''));
  console.log("isLocked: ", lock)

  return (
    <div className={mainInputStyles.textarea_container}>
      <h2>CodeAlong</h2>
      <div className={mainInputStyles.textarea_box}>
        <div className={mainInputStyles.icon_set}>
          {
            currInput.length === 0
              ? null
              : <FontAwesomeIcon
                icon={faClock}
                className={timed ? mainInputStyles.timingIcon : mainInputStyles.timeIcon}
                onClick={() => timeInput()}
              />
          }
          {
            currInput.length === 0
              ? null
              : <FontAwesomeIcon
                className={lock ? mainInputStyles.lockIcon : mainInputStyles.unlockIcon}
                icon={lock ? faLock : faUnlock}
                onClick={() => lockInput()}
              />
          }
        </div>
        <Editor
          value={currInput}
          onValueChange={code => setCurrInput(code)}
          highlight={code => highlight(code, languages.python, 'python')}
          tabSize={4}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
          }}
          textareaClassName={mainInputStyles.text_area}
          preClassName={mainInputStyles.pre_area}
          textareaId={mainInputStyles.text_area_id}
        />

        {lock ?
          <Editor
            value={lockedInput}
            onValueChange={code => setComparedInput(code)}
            highlight={code => highlight(code, languages.python, 'python')}
            tabSize={4}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              position: 'absolute',
              top: 0,
              // zIndex: -1,
            }}
            textareaClassName={mainInputStyles.text_area_locked}
            preClassName={mainInputStyles.pre_area_locked}
            textareaId={mainInputStyles.text_area_id_locked}
          />
          : null}
      </div>
    </div>
  )
}

export default MainInput