import React, { useRef, useState } from 'react';
import handleClickOutside from 'utils/ModalsFunctions/HandleClickOutside';
import { createPortal } from 'react-dom';
import handleContentChange from 'utils/Global/handleContentChange';
import 'css/modals/InsertImage.css';
import 'css/modals/InsertCode.css';
import AceEditor from 'react-ace-builds';
import 'react-ace-builds/webpack-resolver-min';

export default function InsertCode({
  notebooks,
  setnotebooks,
  id,
  showBox,
  setshowBox,
}) {
  const box = useRef(null);

  const [currentFontSize, setcurrentFontSize] = useState(18);
  const [currentLanguage, setcurrentLanguage] = useState('javascript');
  const [currentTheme, setcurrentTheme] = useState('terminal');
  const [currentCode, setcurrentCode] = useState('');
  const handleOnChange = (newValue) => {
    setcurrentCode(newValue);
    console.log(currentCode);
  };

  const handleSubmit = () => {};
  return createPortal(
    <>
      {showBox && (
        <div
          ref={box}
          className='modalBox'
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => handleClickOutside(e, box, setshowBox)}
        >
          <div className='imageBox'>
            <div className='topBar'>
              <span>Add code</span>
            </div>
            <div className='codeField scrollClass'>
              <div className='options'>
                <span className='option'>
                  <span>Language:</span>
                  <select
                    onChange={(e) => {
                      setcurrentLanguage(e.target.value);
                    }}
                  >
                    <option value='javascript'>javascript</option>
                    <option value='java'>java</option>
                    <option value='python'>python</option>
                    <option value='xml'>xml</option>
                    <option value='ruby'>ruby</option>
                    <option value='sass'>sass</option>
                    <option value='markdown'>markdown</option>
                    <option value='mysql'>mysql</option>
                    <option value='json'>json</option>
                    <option value='html'>html</option>
                    <option value='handlebars'>handlebars</option>
                    <option value='golang'>golang</option>
                    <option value='csharp'>c#</option>
                    <option value='elixir'>elixir</option>
                    <option value='typescript'>typescript</option>
                    <option value='css'>css</option>
                  </select>
                </span>
                <span className='option'>
                  <span>Theme:</span>
                  <select
                    onChange={(e) => {
                      setcurrentTheme(e.target.value);
                    }}
                  >
                    <option value='monokai'>monokai</option>
                    <option value='github'>github</option>
                    <option value='tomorrow'>tomorrow</option>
                    <option value='kuroir'>kuroir</option>
                    <option value='twilight'>twilight</option>
                    <option value='xcode'>xcode</option>
                    <option value='textmate'>textmate</option>
                    <option value='solarized_dark'>solarized_dark</option>
                    <option value='solarized_light'>solarized_light</option>
                    <option value='terminal'>terminal</option>
                  </select>
                </span>
                <span className='option'>
                  <span>Font size:</span>
                  <input type='number' />
                  <select
                    onChange={(e) => {
                      setcurrentFontSize(parseInt(e.target.value));
                    }}
                  >
                    <option>12</option>
                    <option>14</option>
                    <option>16</option>
                    <option selected>18</option>
                    <option>20</option>
                    <option>22</option>
                    <option>24</option>
                    <option>28</option>
                    <option>32</option>
                    <option>36</option>
                    <option>44</option>
                    <option>52</option>
                  </select>
                </span>
              </div>

              <AceEditor
                mode={currentLanguage}
                theme={currentTheme}
                name='blah2'
                onChange={handleOnChange}
                width={'100%'}
                fontSize={currentFontSize}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={currentCode}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showLineNumbers: true,
                  tabSize: 2,
                  wrapBehavioursEnabled: true,
                  wrap: true,
                }}
              />
            </div>
            <div className='bottomBar'>
              <button
                onClick={() => {
                  setshowBox(false);
                }}
              >
                Cancel
              </button>
              <button onClick={handleSubmit}>Add</button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById('modal'),
  );
}
